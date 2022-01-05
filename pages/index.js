import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Posts from '../components/Posts'
import Modal from '../components/Modal'

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Photo Sharing Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Body */}
      <Feed />
      {/* Modal */}
      <Modal/>
    </div>
  )
}
