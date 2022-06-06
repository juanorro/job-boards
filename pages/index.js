import { JobsList } from "components/JobsList";
import { getJobs } from "lib/data";
import prisma from "lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function Home({ jobs }) {
  
  const { data: session, status } = useSession();

  const router = useRouter();

  if(session && !session.user.name){
    router.push('/setup');
  } 

  return (
    <div className="mt-10">

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
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      jobs,
    }
  }
}
