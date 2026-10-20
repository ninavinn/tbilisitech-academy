function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <strong>TbilisiTech Academy</strong>
        <p className="muted small">
          © {new Date().getFullYear()} სასწავლო პროექტი · React
        </p>
      </div>
    </footer>
  );
}

export default Footer;
