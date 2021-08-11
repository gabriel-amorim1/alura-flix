import sinon from 'sinon';
import Bson_ObjectId from 'bson-objectid';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import { CreateVideoUseCase } from '../CreateVideoUseCase';
import { ICreateVideoRequestDTO } from '../CreateVideoDTO';

describe('CreateVideoUseCase Context', () => {
    let mongoVideoRepositorySpy: sinon.SinonStubbedInstance<MongoVideosRepository>;
    let createVideoUseCase: CreateVideoUseCase;

    beforeEach(() => {
        mongoVideoRepositorySpy = sinon.createStubInstance(MongoVideosRepository);
        createVideoUseCase = new CreateVideoUseCase(mongoVideoRepositorySpy);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to create a new video', async () => {
        const data: ICreateVideoRequestDTO = {
            title: 'title',
            description: 'description',
            url: 'url',
        };

        const expectedRes = {
            ...data,
            _id: new Bson_ObjectId().toHexString() as any,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        mongoVideoRepositorySpy.findByUrl.resolves(undefined);
        mongoVideoRepositorySpy.createAndSave.resolves(expectedRes);

        const videoCreated = await createVideoUseCase.execute(data);

        expect(expectedRes).toEqual(videoCreated);
    });

    it('should not be able to create a new video - url already registered', async () => {
        expect.hasAssertions();

        const data: ICreateVideoRequestDTO = {
            title: 'title',
            description: 'description',
            url: 'url',
        };

        mongoVideoRepositorySpy.findByUrl.resolves(<any>'video');

        try {
            await createVideoUseCase.execute(data);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(400);
            expect(error.message).toBe('This url is already registered.');
        }
    });
});
