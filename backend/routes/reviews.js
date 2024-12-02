import express from 'express'

const router = express.Router()


router.post('/post' , postReview)

router.get('/reviews' , getAllReviews)

router.get('/reviews/:id' , getReviewById)

router.delete('/reviews/:id' , deleteReviewById)


export default router
