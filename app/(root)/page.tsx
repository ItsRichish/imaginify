import Link from "next/link";
import Image from "next/image";

import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>

        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              className="flex-center flex-col gap-2"
              href={link.route}
            >
              <li className="flex-center rounded-full w-fit bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="text-center text-white p-14-medium">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
}
