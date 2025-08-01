import { ArrowRight } from "lucide-react";

interface Stats8Props {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats8 = ({
  heading = "Platform performance insights",
  description = "Ensuring stability and scalability for all users",
  link = {
    text: "Read the full impact report",
    url: "https://www.shadcnblocks.com",
  },
  stats = [
     {
    id: "stat-1",
    value: "15K+",
    label: "commandes passées ce mois-ci",
  },
  {
    id: "stat-2",
    value: "€450K",
    label: "chiffre d'affaires mensuel",
  },
  {
    id: "stat-3",
    value: "€30.00",
    label: "panier moyen par client",
  },
  {
    id: "stat-4",
    value: "98.7%",
    label: "clients satisfaits sur les 6 derniers mois",
  },
  ],
}: Stats8Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold md:text-4xl">{heading}</h2>
          <p>{description}</p>
          <a
            href={link.url}
            className="flex items-center gap-1 font-bold hover:underline"
          >
            {link.text}
            <ArrowRight className="h-auto w-4" />
          </a>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5">
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats8 };
