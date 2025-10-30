# Simple, production-grade Dockerfile for Next.js + Supabase app
FROM node:20-alpine
WORKDIR /app

# Install deps separately for caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy app
COPY . .

# Build Next.js app
RUN yarn build

EXPOSE 3000
ENV NODE_ENV=development
CMD ["yarn", "start"]

