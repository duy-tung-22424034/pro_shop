import express from 'express'
const router = express.Router()
import {
  getProducts,
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getCategories,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/all').get(getAllProducts)
router.route('/categories').get(getCategories)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
