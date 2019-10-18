interface configuration {
  host: string;
  user: string;
  password: string;
  database: string;
  insecureAuth: boolean;
}

export const config: configuration = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: 'card_gang',
  insecureAuth: true
};
