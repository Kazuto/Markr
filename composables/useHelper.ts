export function useHelper() {
  const uppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return {
    uppercase,
  };
}
