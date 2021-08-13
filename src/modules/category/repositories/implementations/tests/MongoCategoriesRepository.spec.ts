/* eslint-disable no-underscore-dangle */
import { Connection } from 'typeorm';
import { MongoCategoriesRepository } from '../MongoCategoriesRepository';
import connect, { stopMongo } from '../../../../../database/connection';
import Category from '../../../schemas/Category';

describe('MongoCategoriesRepository Context', () => {
    let mongoCategoriesRepository: MongoCategoriesRepository;
    let mongoConnection: Connection[];
    let categorySut: Category;

    beforeAll(async () => {
        mongoConnection = await connect(true);

        mongoCategoriesRepository = new MongoCategoriesRepository();

        const data = {
            title: 'title',
            color: '#000',
        };

        categorySut = await mongoCategoriesRepository.createAndSave(data);
    });

    afterAll(async () => {
        await stopMongo();
        await mongoConnection[0].close();
    });

    it('should be able to create a new category', async () => {
        const data = {
            title: 'title 1',
            color: '#FFF',
        };

        const { _id, created_at, updated_at, deleted_at, ...entityProps } =
            await mongoCategoriesRepository.createAndSave(data);

        expect(_id).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
        expect(deleted_at).toBeNull();
        expect(data).toEqual(entityProps);
    });

    it('should be able to find category by id', async () => {
        const categoryFound = await mongoCategoriesRepository.findById(
            categorySut._id as any,
        );

        expect({ deleted_at: null, ...categoryFound }).toEqual(categorySut);
    });

    it('should be able to find category by title', async () => {
        const categoryFound = await mongoCategoriesRepository.findByTitle(
            categorySut.title,
        );

        expect({ deleted_at: null, ...categoryFound }).toEqual(categorySut);
    });

    it('should be able to list all categories', async () => {
        const categories = await mongoCategoriesRepository.list({});

        expect(categories.count).toBeGreaterThanOrEqual(1);
        expect(categories.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should be able to remove category', async () => {
        const categoryRemoved = await mongoCategoriesRepository.remove(categorySut);

        expect(categoryRemoved.deleted_at).not.toBeUndefined();
    });
});
