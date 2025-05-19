/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - created_at (timestamp)
    - services
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - duration (integer)
      - price (decimal)
      - image (text)
      - category (text)
      - created_at (timestamp)
    - bookings
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - service_id (uuid, references services)
      - date (date)
      - start_time (time)
      - end_time (time)
      - status (text)
      - created_at (timestamp)
    - time_slots
      - id (uuid, primary key)
      - service_id (uuid, references services)
      - date (date)
      - start_time (time)
      - available (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  duration integer NOT NULL,
  price decimal NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read services" ON services
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can read own bookings" ON bookings
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel own bookings" ON bookings
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (status = 'cancelled');

CREATE POLICY "Anyone can read available time slots" ON time_slots
  FOR SELECT TO authenticated
  USING (available = true);