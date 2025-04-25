import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Video from '../models/Video.js';
import Comment from '../models/Comment.js';

const seedDatabase = async () => {
  console.log('Seeding database...');
  
  try {
    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({});
    
    // Create users
    const password = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        username: 'johndoe',
        email: 'john@example.com',
        password,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        subscribers: 1250000
      },
      {
        username: 'janedoe',
        email: 'jane@example.com',
        password,
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        subscribers: 840000
      },
      {
        username: 'techguru',
        email: 'tech@example.com',
        password,
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        subscribers: 2450000
      }
    ]);
    
    // Create videos
    const videos = await Video.insertMany([
      {
        title: 'Getting Started with React',
        description: 'Learn the basics of React in this comprehensive tutorial for beginners. We\'ll cover components, props, state, and more!',
        thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        views: 254789,
        likes: 18540,
        dislikes: 280,
        category: 'tech',
        userId: users[0]._id,
        tags: ['react', 'javascript', 'tutorial']
      },
      {
        title: 'Top 10 Programming Languages in 2024',
        description: 'Discover the most in-demand programming languages for 2024. We analyze job trends, salary data, and developer surveys to bring you the definitive list.',
        thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        views: 189456,
        likes: 14320,
        dislikes: 520,
        category: 'tech',
        userId: users[2]._id,
        tags: ['programming', 'career', 'technology']
      },
      {
        title: 'Morning Yoga Routine for Beginners',
        description: 'Start your day with this 15-minute yoga routine perfect for beginners. Improve flexibility, reduce stress, and boost your energy levels.',
        thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        views: 352140,
        likes: 22650,
        dislikes: 340,
        category: 'fitness',
        userId: users[1]._id,
        tags: ['yoga', 'fitness', 'wellness']
      },
      {
        title: 'How to Make Perfect Pasta Carbonara',
        description: 'Learn the authentic Italian recipe for creamy pasta carbonara. Simple ingredients, amazing results!',
        thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        views: 287320,
        likes: 19870,
        dislikes: 210,
        category: 'cooking',
        userId: users[1]._id,
        tags: ['cooking', 'italian', 'recipe']
      },
      {
        title: 'Building a Full-Stack Application with MERN',
        description: 'In this tutorial, we\'ll build a complete web application using MongoDB, Express, React, and Node.js (MERN stack).',
        thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        views: 198760,
        likes: 15420,
        dislikes: 290,
        category: 'tech',
        userId: users[2]._id,
        tags: ['mern', 'web development', 'javascript']
      },
      {
        title: 'Travel Guide: Hidden Gems in Tokyo',
        description: 'Discover Tokyo\'s best-kept secrets and off-the-beaten-path locations that most tourists never find. Local tips and authentic experiences!',
        thumbnail: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        views: 325470,
        likes: 24680,
        dislikes: 320,
        category: 'travel',
        userId: users[0]._id,
        tags: ['travel', 'japan', 'tokyo']
      },
      // Additional 20 videos
      {
        title: 'Advanced CSS Tricks for Modern Web Design',
        description: 'Learn cutting-edge CSS techniques to create stunning, responsive web designs that will impress your clients and users.',
        thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        views: 178950,
        likes: 12460,
        dislikes: 185,
        category: 'tech',
        userId: users[0]._id,
        tags: ['css', 'web development', 'design']
      },
      {
        title: '30-Minute HIIT Workout for Maximum Calorie Burn',
        description: 'This high-intensity interval training workout will help you burn calories and build strength in just 30 minutes. No equipment needed!',
        thumbnail: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        views: 421560,
        likes: 32750,
        dislikes: 420,
        category: 'fitness',
        userId: users[1]._id,
        tags: ['hiit', 'workout', 'fitness']
      },
      {
        title: 'Homemade Sourdough Bread Recipe',
        description: 'Learn how to make delicious sourdough bread from scratch with this step-by-step guide. From starter to perfect crust!',
        thumbnail: 'https://images.pexels.com/photos/1756062/pexels-photo-1756062.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        views: 256890,
        likes: 18970,
        dislikes: 230,
        category: 'cooking',
        userId: users[1]._id,
        tags: ['baking', 'sourdough', 'bread']
      },
      {
        title: 'Introduction to Machine Learning with Python',
        description: 'Get started with machine learning using Python and scikit-learn. Learn about algorithms, data preprocessing, and model evaluation.',
        thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        views: 215670,
        likes: 17840,
        dislikes: 320,
        category: 'tech',
        userId: users[2]._id,
        tags: ['machine learning', 'python', 'ai']
      },
      {
        title: 'Budget Travel Guide: Explore Europe for Less',
        description: 'Discover how to travel Europe on a budget with tips for affordable accommodations, transportation, food, and attractions.',
        thumbnail: 'https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        views: 312450,
        likes: 25780,
        dislikes: 340,
        category: 'travel',
        userId: users[0]._id,
        tags: ['europe', 'travel', 'budget']
      },
      {
        title: 'Photography Masterclass: Composition Techniques',
        description: 'Elevate your photography with these professional composition techniques. Learn the rule of thirds, leading lines, framing, and more.',
        thumbnail: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        views: 187320,
        likes: 15640,
        dislikes: 210,
        category: 'photography',
        userId: users[2]._id,
        tags: ['photography', 'composition', 'creative']
      },
      {
        title: 'Houseplant Care for Beginners',
        description: 'Learn how to keep your houseplants alive and thriving with this beginner-friendly guide to watering, light, soil, and common problems.',
        thumbnail: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        views: 142870,
        likes: 11920,
        dislikes: 180,
        category: 'lifestyle',
        userId: users[1]._id,
        tags: ['plants', 'gardening', 'home']
      },
      {
        title: 'JavaScript ES6 Features Explained',
        description: 'Get up to speed with the most important ES6 features that every JavaScript developer should know and use.',
        thumbnail: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        views: 198420,
        likes: 16750,
        dislikes: 240,
        category: 'tech',
        userId: users[0]._id,
        tags: ['javascript', 'es6', 'programming']
      },
      {
        title: '15-Minute Guided Meditation for Stress Relief',
        description: 'Take a break from your busy day with this calming guided meditation designed to reduce stress and anxiety.',
        thumbnail: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        views: 287650,
        likes: 24180,
        dislikes: 190,
        category: 'wellness',
        userId: users[1]._id,
        tags: ['meditation', 'mindfulness', 'stress relief']
      },
      {
        title: 'Build Your Own Smart Home Automation System',
        description: 'Learn how to set up an affordable smart home system using Raspberry Pi and open-source software. Control lights, temperature, and more!',
        thumbnail: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        views: 165890,
        likes: 13750,
        dislikes: 320,
        category: 'tech',
        userId: users[2]._id,
        tags: ['smart home', 'iot', 'raspberry pi']
      },
      {
        title: 'Quick and Healthy Meal Prep for the Week',
        description: 'Save time and eat healthier with these meal prep ideas and recipes. One hour of prep for a week of delicious meals!',
        thumbnail: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        views: 342180,
        likes: 28950,
        dislikes: 270,
        category: 'cooking',
        userId: users[1]._id,
        tags: ['meal prep', 'healthy', 'cooking']
      },
      {
        title: 'Watercolor Painting for Absolute Beginners',
        description: 'Start your watercolor journey with this beginner-friendly tutorial covering basic techniques, materials, and a simple landscape painting.',
        thumbnail: 'https://images.pexels.com/photos/3778079/pexels-photo-3778079.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        views: 126750,
        likes: 10820,
        dislikes: 150,
        category: 'art',
        userId: users[0]._id,
        tags: ['watercolor', 'painting', 'art']
      },
      {
        title: 'Understanding Blockchain Technology',
        description: 'Demystify blockchain with this comprehensive explanation of how it works, its applications beyond cryptocurrency, and its future potential.',
        thumbnail: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        views: 176520,
        likes: 14320,
        dislikes: 410,
        category: 'tech',
        userId: users[2]._id,
        tags: ['blockchain', 'cryptocurrency', 'technology']
      },
      {
        title: 'The Ultimate Guide to Sustainable Living',
        description: 'Practical tips for reducing your environmental footprint while saving money. From zero waste to energy efficiency.',
        thumbnail: 'https://images.pexels.com/photos/7262893/pexels-photo-7262893.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        views: 198450,
        likes: 17890,
        dislikes: 220,
        category: 'lifestyle',
        userId: users[1]._id,
        tags: ['sustainable', 'eco-friendly', 'environment']
      },
      {
        title: 'Classic Car Restoration: Beginners Guide',
        description: 'Learn the basics of classic car restoration, from finding the right project to restoration techniques and common challenges.',
        thumbnail: 'https://images.pexels.com/photos/2127025/pexels-photo-2127025.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        views: 143780,
        likes: 12540,
        dislikes: 180,
        category: 'automotive',
        userId: users[0]._id,
        tags: ['classic cars', 'restoration', 'automotive']
      },
      {
        title: 'Acoustic Guitar Lessons for Beginners',
        description: 'Start your musical journey with these beginner-friendly acoustic guitar lessons. Learn chords, strumming patterns, and your first songs.',
        thumbnail: 'https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        views: 256890,
        likes: 21470,
        dislikes: 240,
        category: 'music',
        userId: users[2]._id,
        tags: ['guitar', 'music', 'lessons']
      },
      {
        title: 'Dog Training Fundamentals: Basic Commands',
        description: 'Teach your dog the essential commands with these positive reinforcement training techniques. Perfect for puppies and adult dogs alike.',
        thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        views: 312780,
        likes: 26540,
        dislikes: 310,
        category: 'pets',
        userId: users[1]._id,
        tags: ['dog training', 'pets', 'animals']
      },
      {
        title: 'Advanced Excel Functions for Data Analysis',
        description: 'Take your Excel skills to the next level with these advanced functions and formulas for powerful data analysis and reporting.',
        thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        views: 187450,
        likes: 15720,
        dislikes: 230,
        category: 'tech',
        userId: users[2]._id,
        tags: ['excel', 'data analysis', 'productivity']
      },
      {
        title: 'Urban Sketching Techniques',
        description: 'Capture the energy of city life with these urban sketching techniques. Learn how to draw architecture, people, and cityscapes on location.',
        thumbnail: 'https://images.pexels.com/photos/3797539/pexels-photo-3797539.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        views: 134560,
        likes: 11230,
        dislikes: 140,
        category: 'art',
        userId: users[0]._id,
        tags: ['sketching', 'drawing', 'art']
      },
      {
        title: 'Financial Planning for Young Adults',
        description: 'Get your finances in order with this beginner-friendly guide to budgeting, saving, investing, and planning for the future.',
        thumbnail: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        views: 245780,
        likes: 21340,
        dislikes: 280,
        category: 'finance',
        userId: users[1]._id,
        tags: ['finance', 'money', 'investing']
      },
      {
        title: 'DIY Home Renovation: Kitchen Makeover',
        description: 'Transform your kitchen on a budget with these DIY renovation tips. From cabinet painting to backsplash installation.',
        thumbnail: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        views: 298650,
        likes: 24870,
        dislikes: 320,
        category: 'diy',
        userId: users[0]._id,
        tags: ['diy', 'home improvement', 'kitchen']
      }
    ]);
    
    // Create comments
    await Comment.insertMany([
      // Original 6 comments
      {
        videoId: videos[0]._id,
        userId: users[1]._id,
        text: 'Great tutorial! Finally understood how React state works. Thanks!',
        likes: 45,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[0]._id,
        userId: users[2]._id,
        text: 'Could you do a follow-up on React hooks? That would be super helpful!',
        likes: 32,
        likedBy: [users[0]._id, users[1]._id]
      },
      {
        videoId: videos[1]._id,
        userId: users[0]._id,
        text: 'I\'m surprised Python is still dominating. Great analysis!',
        likes: 28,
        likedBy: [users[1]._id]
      },
      {
        videoId: videos[2]._id,
        userId: users[2]._id,
        text: 'I\'ve been doing this routine for a week and already feel more flexible. Highly recommend!',
        likes: 56,
        likedBy: [users[0]._id]
      },
      {
        videoId: videos[3]._id,
        userId: users[0]._id,
        text: 'Made this last night and it was delicious! The trick with the pasta water really works.',
        likes: 38,
        likedBy: [users[1]._id, users[2]._id]
      },
      {
        videoId: videos[4]._id,
        userId: users[1]._id,
        text: 'This helped me understand the MERN stack so much better. Please make more tutorials!',
        likes: 42,
        likedBy: [users[0]._id]
      },
      // Additional comments for new videos
      {
        videoId: videos[6]._id,
        userId: users[2]._id,
        text: 'These CSS tricks saved me hours of work on my latest project. The grid layout tip was a game-changer!',
        likes: 32,
        likedBy: [users[0]._id, users[1]._id]
      },
      {
        videoId: videos[6]._id,
        userId: users[1]._id,
        text: 'I\'ve been a web developer for years and still learned some new techniques. Great content!',
        likes: 28,
        likedBy: [users[0]._id]
      },
      {
        videoId: videos[7]._id,
        userId: users[0]._id,
        text: 'This workout is intense but effective! I\'ve been doing it 3 times a week and seeing great results.',
        likes: 47,
        likedBy: [users[1]._id, users[2]._id]
      },
      {
        videoId: videos[8]._id,
        userId: users[2]._id,
        text: 'My first sourdough was a disaster, but after following your method, I got a perfect loaf! Thanks!',
        likes: 36,
        likedBy: [users[1]._id]
      },
      {
        videoId: videos[9]._id,
        userId: users[1]._id,
        text: 'As someone with no background in data science, this was the perfect introduction. Looking forward to more ML content!',
        likes: 41,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[10]._id,
        userId: users[2]._id,
        text: 'Used these tips on my recent trip to Eastern Europe and saved so much money! The hostel recommendations were spot on.',
        likes: 39,
        likedBy: [users[0]._id]
      },
      {
        videoId: videos[11]._id,
        userId: users[0]._id,
        text: 'My photography has improved dramatically since applying these composition techniques. The before/after examples were really helpful.',
        likes: 31,
        likedBy: [users[1]._id]
      },
      {
        videoId: videos[12]._id,
        userId: users[2]._id,
        text: 'Finally, my plants are thriving instead of dying! The watering schedule advice was exactly what I needed.',
        likes: 27,
        likedBy: [users[0]._id, users[1]._id]
      },
      {
        videoId: videos[13]._id,
        userId: users[1]._id,
        text: 'The explanations of arrow functions and destructuring were so clear. I feel much more confident with modern JS now.',
        likes: 34,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[14]._id,
        userId: users[0]._id,
        text: 'Ive been using this meditation during my lunch breaks at work. Such a great way to reset and reduce stress!',
        likes: 52,
        likedBy: [users[1]._id, users[2]._id]
      },
      {
        videoId: videos[15]._id,
        userId: users[1]._id,
        text: 'Built this system over the weekend and it works perfectly! The step-by-step instructions were easy to follow.',
        likes: 29,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[16]._id,
        userId: users[2]._id,
        text: 'These recipes are delicious and so convenient. Ive been meal prepping for a month now and its changed my life!',
        likes: 46,
        likedBy: [users[0]._id]
      },
      {
        videoId: videos[17]._id,
        userId: users[0]._id,
        text: 'As a complete beginner, I was intimidated by watercolors, but your tutorial made it so approachable. Love my first painting!',
        likes: 25,
        likedBy: [users[1]._id]
      },
      {
        videoId: videos[18]._id,
        userId: users[1]._id,
        text: 'Finally a blockchain explanation that makes sense! I actually understand the technology now.',
        likes: 33,
        likedBy: [users[0]._id, users[2]._id]
      },
      {
        videoId: videos[19]._id,
        userId: users[2]._id,
        text: 'Ive implemented your zero waste tips in my kitchen and bathroom and its made such a difference. Thank you!',
        likes: 37,
        likedBy: [users[1]._id]
      },
      {
        videoId: videos[20]._id,
        userId: users[0]._id,
        text: 'Just bought my first project car and this guide is exactly what I needed. The rust removal section was particularly helpful.',
        likes: 30,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[21]._id,
        userId: users[1]._id,
        text: 'Ive been trying to learn guitar for years without success, but your teaching style finally clicked for me! Can play 3 songs now!',
        likes: 42,
        likedBy: [users[0]._id, users[2]._id]
      },
      {
        videoId: videos[22]._id,
        userId: users[2]._id,
        text: 'My rescue dog has made incredible progress with these training methods. The positive reinforcement really works!',
        likes: 48,
        likedBy: [users[0]._id]
      },
      {
        videoId: videos[23]._id,
        userId: users[0]._id,
        text: 'The VLOOKUP alternatives you showed have completely changed how I work with data. So much more efficient now!',
        likes: 35,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[24]._id,
        userId: users[1]._id,
        text: 'Tried urban sketching for the first time using your techniques and Im hooked! The perspective tips were especially useful.',
        likes: 26,
        likedBy: [users[0]._id]
      },
      {
        videoId: videos[25]._id,
        userId: users[2]._id,
        text: 'Started following your investment advice last year and Ive already seen significant growth in my portfolio. Thank you!',
        likes: 40,
        likedBy: [users[1]._id]
      },
      {
        videoId: videos[25]._id,
        userId: users[0]._id,
        text: 'The budgeting spreadsheet template is incredibly helpful. I finally have control over my finances!',
        likes: 36,
        likedBy: [users[2]._id]
      },
      {
        videoId: videos[26]._id,
        userId: users[1]._id,
        text: 'Used your painting cabinet technique and it turned out beautiful! Saved thousands compared to buying new cabinets.',
        likes: 44,
        likedBy: [users[0]._id, users[2]._id]
      },
      {
        videoId: videos[26]._id,
        userId: users[2]._id,
        text: 'The tile backsplash installation guide was perfect for a DIY newbie like me. My kitchen looks amazing now!',
        likes: 38,
        likedBy: [users[1]._id]
      }
    ]);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedDatabase;