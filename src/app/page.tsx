'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';
import Link from 'next/link';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main className='h-full'>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page!" />
      </Head>
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-t from-black from-70% to-[#1e293b] p-8 gap-4">
        <div className="text-white text-center w-fit h-fit">
          {/* <h1 className="text-4xl font-bold">Welcome to Our Application</h1>
          <p className="mt-4">This is the home page. Start exploring!</p> */}
          <div onClick={() => window.location.href = "/appointments/add"} className='mt-8 text-5xl font-bold cursor-pointer hover:underline'>
            Click here to redirect to the add appointments page
          </div>
        </div>

      </div>
    </main>
  );
}
