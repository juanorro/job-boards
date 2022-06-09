import { JobsList } from "components/JobsList";
import { getJobs, getUser } from "lib/data";
import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Home({ jobs, user }) {
  
  const { data: session, status } = useSession();

  const router = useRouter();

  if(session && !session.user.name){
    router.push('/setup');
  } 

  return (
    <div className="mt-10">

      { session && (
        <>
          <p className="mb-10 px-8 text-2xl font-normal">
            Welcome, { user.name }
            { user.company && (
              <span className="bg-black text-white uppercase text-sm p-2">
                Company
              </span>
            )}
          </p>
          { user.company ? (
            <>
              <Link href={ '/new' }>
                <button 
                  className="border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black"
                >
                  Click here to post a new job
                </button>
              </Link>
              <button className="ml-5 border px-8 py-2 font-bold rounded-full bg-black text-white border-black">
                See all jobs you posted
              </button>
            </>
          ) : (
            <>
              <button className="ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black">
                See all jobs you applied to
              </button>
            </>
          )}
        </>
      )}

      { !session && (
        <a 
          className="border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black"
          href="/api/auth/signin">login</a>
      )}
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">Find a job!</h2>
      </div>
      <JobsList jobs={ jobs } />
    </div>
  )
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  let user = await getUser(session.user.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      jobs,
      user,
    }
  }
}
