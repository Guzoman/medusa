const fs = require("fs")
const path = require("path")

const DEFAULT_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"]
const ROOT_NODE_MODULES = path.resolve(__dirname, "node_modules")

const debug = (...args) => {
  if (process.env.JEST_MEDUSA_DEBUG) {
    // eslint-disable-next-line no-console
    console.error("[medusa-resolver]", ...args)
  }
}

const normalizeSubPath = (subPath) => {
  if (!subPath) {
    return ""
  }

  if (subPath.startsWith("dist/")) {
    return subPath.slice("dist/".length)
  }

  return subPath
}

const resolveWithExtensions = (basePath, extensions) => {
  if (fs.existsSync(basePath)) {
    const stats = fs.statSync(basePath)

    if (stats.isFile()) {
      return basePath
    }

    if (stats.isDirectory()) {
      for (const ext of extensions) {
        const candidate = path.join(basePath, `index${ext}`)

        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          return candidate
        }
      }
    }
  }

  for (const ext of extensions) {
    const candidate = `${basePath}${ext}`

    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate
    }
  }

  return null
}

module.exports = (request, options) => {
  if (!request.startsWith("@medusajs/")) {
    return options.defaultResolver(request, options)
  }

  const [scope, pkg, ...rest] = request.split("/")

  if (!scope || !pkg) {
    return options.defaultResolver(request, options)
  }

  const packageName = `${scope}/${pkg}`

  try {
    let pkgDir = path.join(ROOT_NODE_MODULES, packageName)

    if (!fs.existsSync(pkgDir)) {
      const pkgJsonPath = options.defaultResolver(`${packageName}/package.json`, {
        ...options,
        packageFilter: undefined,
      })

      pkgDir = path.dirname(pkgJsonPath)
    }
    const srcDir = path.join(pkgDir, "src")
    const extensions = Array.from(
      new Set([...(options.extensions || []), ...DEFAULT_EXTENSIONS])
    )

    const subPath = normalizeSubPath(rest.join("/"))
    const targetBase = subPath ? path.join(srcDir, subPath) : srcDir
    debug(`Resolving ${request}`, {
      packageName,
      subPath,
      targetBase,
    })
    const resolvedPath = resolveWithExtensions(targetBase, extensions)

    if (resolvedPath) {
      debug(`Resolved ${request} to ${resolvedPath}`)
      return resolvedPath
    }
    if (packageName === "@medusajs/medusa" && subPath) {
      const moduleBase = path.join(srcDir, "modules", subPath)
      const modulePath = resolveWithExtensions(moduleBase, extensions)

      if (modulePath) {
        debug(`Resolved ${request} to ${modulePath} via modules fallback`)
        return modulePath
      }
    }
    debug(`Falling back to default resolver for ${request}`)
  } catch (err) {
    // Ignore resolution errors and fall back to Jest's default resolver.
    debug(`Error resolving ${request}:`, err)
  }

  return options.defaultResolver(request, options)
}
