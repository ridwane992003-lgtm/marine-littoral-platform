// Simulation d'une base de données en mémoire locale
export const usersDatabase = {
  users: [] as Array<{ name: string; email: string; institution: string; password?: string }>
};