# Quick Setup Guide
## Demo

https://drive.google.com/file/d/19_cGUU8TWO4oPhqVsBI1SSWQbiv21NwI/view?usp=sharing

## Step-by-Step Setup (5 minutes)

### 1️⃣ Set up Supabase Project
1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** and run the contents of `database_setup.sql`
3. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` `public` key

### 2️⃣ Configure Environment
Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3️⃣ Install & Run
```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Alternative: Docker Setup

```bash
# Build
docker build -t zenrows-app .

# Run (replace with your actual keys)
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  zenrows-app
```

---

## Testing the App

1. **Sign Up/In**: Enter email/password in the navbar → Click "Sign In" or "Create Account"
2. **Select Origin**: Click on any origin card (Zillow, Redfin, etc.)
3. **Select Destination**: Click on any destination card (S3, MySQL, etc.)
4. **Save**: Click "Save combination" button
5. **View Saved**: See your combinations listed below
6. **Delete**: Click the X button to remove a combination
