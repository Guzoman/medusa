const path = require("path")

const MEDUSA_RESOLVER = path.resolve(__dirname, "jest.medusa-resolver.js")

const getCallerDir = () => {
  const originalPrepareStackTrace = Error.prepareStackTrace
  try {
    Error.prepareStackTrace = (_, stack) => stack
    const { stack } = new Error()

    if (Array.isArray(stack)) {
      for (const callsite of stack) {
        const fileName = callsite.getFileName?.()

        if (!fileName || fileName === __filename) {
          continue
        }

        return path.dirname(fileName)
      }
    }
  } catch (err) {
    // Fall back to the current working directory if we cannot determine the caller.
  } finally {
    Error.prepareStackTrace = originalPrepareStackTrace
  }

  return process.cwd()
}

module.exports = function defineJestConfig(config = {}) {
  const callerDir = getCallerDir()
  const {
    moduleNameMapper: userModuleNameMapper = {},
    rootDir: userRootDir,
    resolver: userResolver,
    ...restConfig
  } = config

  const rootDir = userRootDir ?? callerDir
  const moduleNameMapper = {
    ...userModuleNameMapper,
  }
  const resolver = userResolver ?? MEDUSA_RESOLVER

  return {
    transform: {
      "^.+\\.[jt]s$": [
        "@swc/jest",
        {
          jsc: {
            parser: {
              syntax: "typescript",
              decorators: true,
            },
            transform: {
              useDefineForClassFields: false,
              legacyDecorator: true,
              decoratorMetadata: true,
            },
            target: "ES2021",
          },
          sourceMaps: "inline",
        },
      ],
    },
    modulePathIgnorePatterns: [`dist/`],
    testPathIgnorePatterns: [`dist/`, `node_modules/`],
    transformIgnorePatterns: ["node_modules/(?!@medusajs/)"],
    testEnvironment: `node`,
    moduleFileExtensions: [`js`, `ts`],
    moduleNameMapper,
    resolver,
    rootDir,
    ...restConfig,
  }
}
