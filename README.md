# 💰 DailyPay Gigs - Your Daily Earnings Hub

![App Banner](https://imgix.cosmicjs.com/186b18f0-ea5f-11f0-a803-8b03521300e6-photo-1526367790999-0150786686a2-1767635450423.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern job board platform connecting people with quick-paying gig opportunities. Find delivery jobs, freelance work, and task-based gigs that pay daily, weekly, or instantly.

## ✨ Features

- 🔍 **Smart Job Search** - Filter jobs by category, platform, and payment frequency
- 💼 **Platform Directory** - Browse trusted gig economy platforms with ratings
- 🏷️ **Category Organization** - Jobs grouped by type (Delivery, Freelance, Tasks)
- 💰 **Payment Focus** - Clear display of pay rates and payment schedules
- 📱 **Responsive Design** - Beautiful experience on all devices
- 🚀 **Fast Performance** - Built with Next.js 16 for optimal speed
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS
- 🔗 **Direct Applications** - Easy links to apply on platform websites

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=695bf9476d538c4d2c7198f0&clone_repository=695bfb236d538c4d2c719921)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Where I can be getting paid daily"

### Code Generation Prompt

> Based on the content model I created for "Where I can be getting paid daily", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 🎯 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with the DailyPay Gigs bucket

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd dailypay-gigs
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=prosper-texas-production
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Jobs with Relationships

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all jobs with platform and category data
const { objects: jobs } = await cosmic.objects
  .find({ type: 'jobs' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Filter by category
const { objects: deliveryJobs } = await cosmic.objects
  .find({ 
    type: 'jobs',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Single Job

```typescript
// Get job by slug with related data
const response = await cosmic.objects
  .findOne({ type: 'jobs', slug: jobSlug })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const job = response.object
```

### Fetching Platforms

```typescript
// Get all platforms with ratings
const { objects: platforms } = await cosmic.objects
  .find({ type: 'platforms' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(0)
```

## 🔧 Cosmic CMS Integration

### Content Types

The application uses three main content types:

1. **Jobs** - Gig opportunities with pay rates and requirements
   - Job Title, Description, Pay Rate
   - Payment Frequency (instant/daily/weekly)
   - Requirements, How to Apply
   - Connected to Platform and Category

2. **Platforms** - Trusted gig economy platforms
   - Platform Name, Description
   - Website URL, Rating, Payment Method
   - Platform Logo

3. **Categories** - Job type groupings
   - Category Name, Description

### Content Model Structure

```typescript
interface Job {
  id: string
  slug: string
  title: string
  metadata: {
    job_title: string
    description: string
    pay_rate: string
    payment_frequency: {
      key: 'instant' | 'daily' | 'weekly'
      value: string
    }
    requirements?: string
    how_to_apply?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    platform?: Platform
    category?: Category
  }
}
```

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js application:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📖 Documentation

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com)

<!-- README_END -->