import Image from "next/image";

export default function Home() {
  return (
    <main className="page">
      <div className="content">
        <Image
          src="/logo.png"
          alt="SaSarjan — co-creating together"
          width={750}
          height={213}
          priority
          className="logo"
        />
        <h1>Coming soon</h1>
        <p>We&rsquo;re building something new. Check back shortly.</p>
        <a href="mailto:info@sasarjan.com" className="contact">
          info@sasarjan.com
        </a>
      </div>
      <footer>&copy; {new Date().getFullYear()} SaSarjan</footer>
    </main>
  );
}
