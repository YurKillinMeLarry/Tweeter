import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon
} from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { db } from '../firebase'
import Image from 'next/image'
import React from 'react'

function Post({ id, post, postPage }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700'>
      {!postPage && (
        <img
          src={post?.userImg}
          alt=''
          height={44}
          width={44}
          className='rounded-full mr-4'
        />
      )}{' '}
      {/* If no Postpage then image will NOT load */}
      <div className='flex flex-col space-y-2 w-full'>
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt='profile pic'
              height={44}
              width={44}
              className='rounded-full mr-4'
            />
          )}{' '}
          {/*  Image will render only if there is a PostPage */}
          <div className='text-[#6e767d]'>
            <div className='inline-block group'>
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}
              >
                @{post?.tag}
              </span>
            </div>{' '}
            ·{' '}
            <span className='hover:underline text-sm sm:text-[15px]'>
              {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
            </span>
            {!postPage && (
              <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                {post?.text}
              </p>
            )}
          </div>
          <div className='icon group flex-shrink-0 ml-auto'>
            <DotsHorizontalIcon classname='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]' />
          </div>
        </div>
        {postPage && (
          <p className='text-[#d9d9d9] mt-0.5 text-xl'>{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=''
          className='rounded-2xl max-h-[700px] object-cover mr-2'
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && 'mx-auto'
          }`}
        >
          <div classname='flex items-center space-x-1 group'>
            <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10'>
              <ChatIcon className='h-5 group-hover:text-[#1d9bf0]' />
            </div>
            {comments.length > 0 && (
              <span className='group-hover:text-[#1d9bf0] text-sm'>
                {comments.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post

/* option chaining to protect yourself
if its undefined then it will wait to get the image before erroring out

*/
