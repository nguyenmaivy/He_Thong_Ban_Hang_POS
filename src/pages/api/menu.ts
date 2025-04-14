import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { categoryId } = req.query;

            // Lấy danh sách categories
            const categories = await prisma.categories.findMany({
                where: { is_active: true },
                select: {
                    id_category: true,
                    name: true,
                    image_path: true,
                },
            });

            // Lấy danh sách products, lọc theo categoryId nếu có
            const products = await prisma.products.findMany({
                where: {
                    is_active: true,
                    ...(categoryId ? { id_category: Number(categoryId) } : {}),
                },
                select: {
                    id_product: true,
                    name: true,
                    price: true,
                    image_path: true,
                    id_category: true,
                },
            });

            res.status(200).json({
                products: products.map((p) => ({
                    id: p.id_product,
                    name: p.name,
                    price: Number(p.price),
                    image: p.image_path || '/images/default.jpg',
                    id_category: p.id_category,
                })),
                categories: categories.map((c) => ({
                    id: c.id_category,
                    name: c.name,
                    image: c.image_path || '/images/default.jpg',
                })),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}