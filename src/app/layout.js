import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'WordPress Blog',
  ription: 'Display WordPress posts and pages',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true"
      >{children}</body>
    </html>
  );
}
