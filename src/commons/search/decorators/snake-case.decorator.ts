export function SnakeCase(
  target: any,
  propertyKey: string,
  parameterIndex: number,
) {
  const originalMethod = target[propertyKey];

  target[propertyKey] = function (...args: any[]) {
    // Get the parameter value from the arguments list
    const parameterValue = args[parameterIndex];

    if (typeof parameterValue === 'object') {
      // Convert all property names to snake case
      const snakeCaseObject: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(parameterValue)) {
        const snakeCaseName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        snakeCaseObject[snakeCaseName] = value;
      }

      // Replace the original parameter value with the modified object
      args[parameterIndex] = snakeCaseObject;
    } else if (typeof parameterValue === 'string') {
      // Convert the parameter name to snake case
      const parameterName = originalMethod
        .toString()
        .match(/\((.*?)\)/)[1]
        .split(',')
        [parameterIndex].trim();
      const snakeCaseName = parameterName
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase();

      // Wrap the parameter value in an object with the snake case name as the key
      args[parameterIndex] = { [snakeCaseName]: parameterValue };
    }

    // Call the original method with the modified parameters
    return originalMethod.apply(this, args);
  };
}
