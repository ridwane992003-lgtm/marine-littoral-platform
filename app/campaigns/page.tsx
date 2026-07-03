import Link from "next/link";
import Image from "next/image";

const links = [
  ["/", "Accueil"],
  ["/dashboard", "Dashboard"],
  ["/species", "Espèces"],
  ["/environment", "Facteurs"],
  ["/remote-sensing", "Télédétection"],
  ["/prediction", "Prédiction"],
  ["/campaigns", "Campagnes"],
  ["/auth/login", "Connexion"]
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold text-marine">
          <Image
            src="/logo-litto-watch.jpeg"
            alt="Litto-Watch"
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <span>Litto-Watch</span>
        </Link>

        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="text-slate-700 hover:text-marine">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
