import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'

export const revalidate = 60

function getImageUrl(value: unknown): string | null {
  if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
    return value.url
  }

  return null
}

export default async function Homepage() {
  const payload = await getPayload({ config })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
    overrideAccess: false,
  })

  const projects = await payload.find({
    collection: 'projects',
    where: {
      featured: {
        equals: true,
      },
    },
    sort: 'displayOrder',
    limit: 6,
    depth: 1,
    draft: false,
    overrideAccess: false,
  })

  const heroPortrait = getImageUrl(homepage.heroPortrait)
  const aboutPortrait = getImageUrl(homepage.aboutPortrait)

  return (
    <main className="bg-[#FAFAFA] text-[#111111] px-2">
      <section
        id="home"
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-3 md:px-12"
      >
        <div className="order-2 relative z-10 md:order-1 md:pt-40">
          <p className="mb-5 text-xs text-neutral-500">
            Curious by nature. An engineer by practice.
          </p>

          <h1 className="max-w-md text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            {homepage.heroHeadline || 'Building thoughtful digital experiences through technology.'}
          </h1>
        </div>

        <div className="order-1 relative isolate flex h-120 items-end justify-center overflow-hidden md:order-2 md:h-162.5">
          <Image
            src={heroPortrait || '/images/hero-placeholder.png'}
            alt={homepage.name || 'Profile portrait'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="z-0 origin-bottom scale-[1.3] object-contain object-bottom md:scale-[2] lg:translate-y-14 lg:-translate-x-16"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(2rem,8vw,8rem)] bg-linear-to-r from-[#fafafa] via-[#fafafa]/60 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(2rem,8vw,8rem)] bg-linear-to-l from-[#fafafa] via-[#fafafa]/60 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%] backdrop-blur-[10px] [mask:linear-gradient(to_bottom,transparent_0%,black_40%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[28%] bg-linear-to-b from-transparent via-[#fafafa]/70 to-[#fafafa]"
          />
        </div>

        <div className="order-3 relative z-10 md:-mt-32">
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-600">
            {homepage.heroDescription ||
              'A software developer passionate about building meaningful technology.'}
          </p>

          <a
            href="#contact"
            className="transition duration-300 ease-in-out inline-flex items-center rounded-2xl drop-shadow-gray-500 drop-shadow-md from-gray-950 to-gray-600 px-7 py-3 text-sm text-white bg-linear-to-tr hover:from-[#FE4409] hover:to-[#FFDACE] from-55% gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
            Get in Touch
          </a>
        </div>
      </section>

      <section
        id="about"
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-12"
      >
        <div className="relative flex flex-col justify-between">
          <p className="text-sm">About Me in 10 sec</p>

          <div className="relative h-32 w-32 bg-gray-200 rounded-xl items-center justify-center">
            <Image
              src={aboutPortrait || '/images/nah.png'}
              alt="About portrait"
              fill
              sizes="256px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-6">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            {homepage.aboutHeading || 'Hi, I’m Meisha.'}
            <br />
            {'A software developer from Cimahi.'}
          </h2>

          <p className="max-w-lg text-sm text-neutral-500">
            {homepage.aboutDescription ||
              "I'm a passionate web designer and developer who loves diversity – no two projects are the same. Interacting with people from a wide range of industries makes every project exciting. Together, we develop creative solutions for your website."}
          </p>

          <div className="flex justify-between gap-4 items-center">
            <a
              href="#works"
              className="transition-colors duration-300 ease-in-out flex w-full rounded-2xl bg-linear-to-tr from-gray-950 to-gray-600 hover:from-[#FE4409] hover:to-[#FFDACE] from-55% px-8 py-3 text-sm text-gray-50 items-center justify-center drop-shadow-lg drop-shadow-gray-500"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="transition-colors duration-300 ease-in-out flex w-full rounded-2xl border border-gray-200 px-8 py-3 text-sm text-gray-500 items-center justify-center hover:border-gray-400 hover:text-gray-900"
            >
              More Detail
            </a>
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-medium tracking-tight">Featured Works</h2>

          <a
            href="/works"
            className="inline-flex items-center gap-2 text-sm rounded-2xl border border-gray-200 text-gray-500 px-8 py-3 transition-colors duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900"
          >
            All Works
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#6a7282"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.docs.map((project) => {
            const thumbnail = getImageUrl(project.thumbnail)

            return (
              <article
                key={project.id}
                className="group relative aspect-[1.35] overflow-hidden rounded-2xl bg-neutral-900"
              >
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="mb-3 text-2xl font-medium">{project.title}</h3>

                  <div className="flex flex-wrap gap-2">
                    {project.category && (
                      <span className="rounded-full border border-white/60 px-3 py-1 text-xs">
                        {project.category}
                      </span>
                    )}

                    {project.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full border border-white/60 px-3 py-1 text-xs"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative z-10 bg-[#FAFAFA] rounded-b-3xl w-full px-6 py-28 md:px-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-14 grid gap-8 md:grid-cols-2">
            <p className="text-sm">✳ Services</p>

            <h2 className="text-3xl font-medium tracking-tight">
              {homepage.servicesHeading || 'Turning complex ideas into practical solutions.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 items-stretch">
            {homepage.services?.map((service) => {
              const image = getImageUrl(service.image)

              return (
                <article
                  key={service.id}
                  className="flex flex-col rounded-2xl p-2 transition-transform drop-shadow-md drop-shadow-white hover:-translate-y-2 bg-gray-100 hover:bg-black hover:drop-shadow-xl hover:drop-shadow-orange-300 group"
                >
                  <div className="px-4 py-2 items-center justify-between w-full overflow-hidden rounded-xl bg-white inline-flex group-hover:bg-orange-600">
                    <h3 className="text-xl font-medium group-hover:text-white">{service.title}</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      className="fill-current text-gray-500 group-hover:text-white"
                    >
                      <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
                    </svg>
                  </div>

                  <div className="flex flex-1 flex-col bg-white rounded-2xl p-4 mt-2 group-hover:bg-orange-600">
                    <p className="mb-4 text-sm leading-relaxed opacity-75 group-hover:text-white group-hover:opacity-100">
                      {service.description}
                    </p>

                    {image && (
                      <img
                        src={image}
                        alt={service.title}
                        className="mb-6 aspect-[1.5] w-full rounded-xl object-cover"
                      />
                    )}

                    <div className="mt-auto flex flex-wrap gap-2">
                      {service.tags?.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-lg bg-gray-100 group-hover:bg-transparent group-hover:text-white group-hover:border group-hover:border-white px-3 py-1 text-xs"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-md rotate-45 translate bg-[#FAFAFA] text-black"></div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rounded-b-3xl bg-black px-6 py-28 text-white md:px-12 -mt-6">
        <div className="mx-auto grid max-w-7xl gap-16 md:flex md:flex-row md:items-center md:gap-24">
          <div className="flex-2">
            <p className="mb-6 text-sm">✳ How it works</p>

            <h2 className="max-w-xl text-3xl font-medium tracking-tight md:text-4xl">
              {homepage.processHeading || 'A thoughtful approach to building better solutions.'}
            </h2>

            <p className="max-w-md text-sm leading-7 text-neutral-400">
              {homepage.processDescription ||
                'Every project begins by understanding the problem, exploring possibilities, and identifying the most effective solution.'}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 text-black flex-1">
            <div className="flex justify-between text-sm">
              <span>Project Brief</span>
              <span className="text-orange-600">01</span>
            </div>

            <div className="my-6 w-full border border-gray-400" />

            <p className="mb-12 text-sm leading-7 text-gray-500">
              Every project begins by understanding the problem, exploring possibilities, and
              identifying the most effective solution.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                'Research',
                'Design',
                'Development',
                'Coorporate Thinking',
                'Testing',
                'Iteration',
                'User Journey',
                'User Research',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-xl bg-neutral-100 px-4 py-2 text-xs text-gray-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4 bg-gray-200 rounded-2xl p-2">
          {homepage.socialLinks?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl border border-neutral-200 px-5 py-3 text-center bg-gray-100 items-center justify-center gap-2 transition-colors duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900"
            >
              {link.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#7F7F7F"
              >
                <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
              </svg>
            </a>
          ))}
        </div>

        <div className="grid min-h-125 overflow-hidden rounded-2xl bg-black text-white md:grid-cols-2">
          <div className="relative min-h-87.5 bg-neutral-800 m-0 md:rounded-2xl overflow-hidden md:m-4">
            <Image
              src={
                getImageUrl(homepage.contactPortrait)!
                  ? getImageUrl(homepage.contactPortrait)!
                  : '/images/contact.png'
              }
              alt="Contact portrait"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <h2 className="mb-8 text-4xl font-medium tracking-tight">
                {homepage.contactHeading || "Let's build something meaningful together."}
              </h2>

              {homepage.contactEmail && (
                <a
                  href={`mailto:${homepage.contactEmail}`}
                  className="inline-flex rounded-2xl bg-linear-to-tr from-white to-white px-6 py-3 text-sm text-black items-center justify-center gap-2 transition-colors duration-300 ease-in-out hover:from-[#FE4409] hover:to-[#FFDACE] from-55%"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#222020"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                  Email Me
                </a>
              )}
            </div>

            <p className="mt-16 text-xs text-neutral-500">
              © {new Date().getFullYear()} {homepage.name}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
