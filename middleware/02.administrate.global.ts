export default defineNuxtRouteMiddleware((to) => {
  const { isAdmin } = useAuth();

  if (!to.path.startsWith("/admin")) return;

  // If unauthenticated and
  if (!isAdmin.value) {
    // trying to access login page, allow navigation
    if (to.name === "admin-login") {
      return;
    }

    // trying to access any page except login, redirect to login
    return navigateTo({ name: "admin-login" });
  }

  // If authenticated and accessing login page, redirect to index
  if (to.name === "admin-login") {
    return navigateTo({ name: "admin" });
  }

  // Otherwise allow navigation
  return;
});
