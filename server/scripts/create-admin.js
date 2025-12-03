import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createMasterAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innovateher');
    console.log('Connected to MongoDB');

    // Get admin details from command line arguments or use defaults
    const email = process.argv[2] || 'admin@innovateher.com';
    const password = process.argv[3] || 'admin123';
    const firstName = process.argv[4] || 'Master';
    const lastName = process.argv[5] || 'Admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`❌ Admin with email ${email} already exists!`);
      console.log('   If you want to update the password, delete the user first or use a different email.');
      process.exit(1);
    }

    // Create master admin
    const admin = new User({
      email,
      password,
      firstName,
      lastName,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Master admin created successfully!');
    console.log('\n📋 Admin Details:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Name: ${firstName} ${lastName}`);
    console.log(`   Role: admin`);
    console.log('\n⚠️  Please change the password after first login!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createMasterAdmin();

