import React from 'react'
import SkeletonBanner from '../SkeletonBanner/SkeletonBanner'
import SkeletonPoster from '../SkeletonPoster/SkeletonPoster'


export default function SkeletonBasicPage() {
    return (
        <div>
            <SkeletonBanner/>
            <SkeletonBanner/>
            <SkeletonPoster />
            <SkeletonPoster />
        </div>
    )
}
