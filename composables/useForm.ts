export function useForm<Type>(T: Type) {
  const initial = ref<typeof T>({ ...T });
  const form = ref<typeof T>({ ...T });

  const fillForm = (data: Partial<typeof T>) => {
    form.value = { ...form.value, ...data };
  };

  const resetForm = (callback?: () => void) => {
    fillForm(initial.value);

    if (callback) {
      callback();
    }
  };

  return {
    form,
    fillForm,
    resetForm,
  };
}
