import React ,{useEffect}from 'react';

const blogsData = [
  {
    title: "Innovative Projects by Astrophels Students",
    date: "January 10, 2026",
    author: "Admin",
    summary: "Our students showcased over 50 innovative projects at the National Tech Expo, reflecting creativity and problem-solving skills.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"
  },
  {
    title: "Cultural Fest 2025 Highlights",
    date: "December 22, 2025",
    author: "Admin",
    summary: "Astrophels Engineering College won first place in the National Cultural Fest, with performances across music, dance, and drama.",
    image: "https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/05/teaching-blog.jpg"
  },
  {
    title: "Campus Wi-Fi Upgrade",
    date: "November 15, 2025",
    author: "Admin",
    summary: "The entire campus now has high-speed Wi-Fi connectivity, enabling students to work seamlessly across all devices.",
    image: "https://static.youngpostclub.com/article_image/sites/default/files/d8/yp/images/shutterstock_594171068.jpg?image_process=image/resize,w_3840/quality,Q_75"
  },
  {
    title: "Sports Championship Victory",
    date: "October 10, 2025",
    author: "Admin",
    summary: "Astrophels students won the inter-college football and cricket championships, demonstrating exceptional teamwork and skills.",
    image: "https://myschool-assets.s3.ap-south-1.amazonaws.com/all_media/YIm5dzQjKn0hj6n48yhGhoUgtGNPe50lvS6Do00d.webp"
  },
  {
    title: "Guest Lecture Series 2025",
    date: "September 5, 2025",
    author: "Admin",
    summary: "Industry leaders conducted interactive sessions for students, covering topics on AI, Blockchain, and Emerging Technologies.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"
  },
    {
    title: "Guest Lecture Series 2025",
    date: "September 5, 2025",
    author: "Admin",
    summary: "Industry leaders conducted interactive sessions for students, covering topics on AI, Blockchain, and Emerging Technologies.",
    image: "https://itmddn.in/images/news/image__tcsion-blog2.jpg"
  }
];

const Blog = () => {
    useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  return (
    <div className="bg-gray-50 py-16 mt-7">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-semibold mb-4 text-gray-900 text-center">Latest Blogs</h1>
        <p className="text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Stay updated with the latest news, events, and achievements from Astrophels Engineering College.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog, index) => (
            <div
              key={index}
              className=" rounded-2xl overflow-hidden transition-shadow duration-300 flex flex-col"
            >
                 <div className='h-full'>
                 <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-b-2xl"
              />
             </div>
            
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{blog.title}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {blog.date} | {blog.author}
                </p>
                <p className="text-gray-700 flex-1">{blog.summary}</p>
                <button className="mt-4 bg-[#2f3834] text-white px-4 py-2 rounded-full font-semibold hover:bg-lime-600 transition-colors duration-300 w-max">
                  Read More 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
