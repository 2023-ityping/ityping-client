/** @type {import('next').NextConfig} **/
const nextConfig = {
    reactStrictMode: true,
    rewrites: function() {
        return [{
            source: "/:path*",
            destination: "http://localhost:5000/:path*",
        }];
    }
}

module.exports = {}