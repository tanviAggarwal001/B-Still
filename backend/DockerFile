FROM node:18

# Install TeX Live packages so pdflatex is available
RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-fonts-recommended texlive-fonts-extra texlive-latex-extra && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of your backend source code
COPY . .

# Expose the port defined in the PORT env variable (Render provides PORT)
EXPOSE $PORT

# Start your application (ensure "start" is defined in package.json)
CMD ["yarn", "start"]