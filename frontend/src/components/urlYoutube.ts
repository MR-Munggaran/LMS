 function getYoutubeEmbedUrl(url: string) {
    try {
      const urlObj = new URL(url);
      
      // Handle youtu.be short URLs
      if (urlObj.hostname === "youtu.be") {
        const videoId = urlObj.pathname.slice(1); // Remove the leading '/'
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // Handle regular youtube.com URLs
      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      // If it's already an embed URL, return as is
      if (url.includes("youtube.com/embed")) {
        return url;
      }
      
      return null;
    } catch {
      return null;
    }
  }

export default getYoutubeEmbedUrl