const fs = require('fs');
const path = require('path');

const blogTsPath = path.join(__dirname, 'src', 'data', 'blog.ts');
const newPostPath = path.join(__dirname, 'new_post.md');

let blogTsContent = fs.readFileSync(blogTsPath, 'utf8');
const newPostContent = fs.readFileSync(newPostPath, 'utf8');

// The new blog post object
const newPostObj = `  {
    id: "4",
    slug: "best-iptv-usa",
    title: "Best IPTV USA – Stream Smarter, Watch Without Limits",
    description: "Learn what to look for when choosing the best IPTV USA service. Discover how IPTV streaming works, device compatibility, streaming quality, and how to evaluate an IPTV subscription.",
    date: "August 23, 2026",
    author: "OmniPtv",
    category: "Guides",
    coverImage: "/blog/best-iptv-usa-featured.webp",
    content: \`${newPostContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`
  }`;

// Find the end of the array
const arrayEndIndex = blogTsContent.lastIndexOf('];');

if (arrayEndIndex !== -1) {
    // Check if there's a trailing comma on the last item
    const contentBeforeEnd = blogTsContent.substring(0, arrayEndIndex).trimEnd();
    let insertionStr = '';
    if (contentBeforeEnd.endsWith('}')) {
        insertionStr = ',\n' + newPostObj + '\n';
    } else if (contentBeforeEnd.endsWith(',')) {
        insertionStr = '\n' + newPostObj + '\n';
    } else {
        insertionStr = ',\n' + newPostObj + '\n';
    }

    const newBlogTsContent = blogTsContent.substring(0, arrayEndIndex).trimEnd() + insertionStr + '];\n';
    
    fs.writeFileSync(blogTsPath, newBlogTsContent, 'utf8');
    console.log("Successfully added new blog post.");
} else {
    console.error("Could not find the end of the blogPosts array.");
}
