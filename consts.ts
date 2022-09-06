export const consts = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || '',
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
};
