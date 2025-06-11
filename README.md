# Bookingston - delayed

## Running the application

### Container mode

**Prerequisites** (for running):

- **Docker** installed on the machine

**To run the application**: run the commands `docker compose build` and `docker compose up`

**Backend**: can be accessed on port `4001`

**Frontend**: can be accessed on port `4002`

### Locally

**Prerequisites** (for backend):

- a **Redis Stack** container (with **Redis Insight**) running on ports `6379:6379` and `8001:8001`
- a PostgreSQL database called `bookingston_db`

**Backend**: run the command `npm run start` (or `npm run start:dev` if running the dev. mode) inside the `server` folder

**Frontend**: run the commands `npm run build` and `npm run start` inside the `client` folder (or `npm run dev` if running the dev.mode)
