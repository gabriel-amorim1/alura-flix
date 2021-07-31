/* eslint-disable no-underscore-dangle */
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { MongoVideosRepository } from '../implementations/MongoVideosRepository';
import connect, { stopMongo } from '../../../../database/connection';
import Video from '../../schemas/Video';

describe('MongoVideosRepository Context', () => {
    let mongoVideosRepository: MongoVideosRepository;
    let mongoConnection: Connection[];
    let videoSut: Video;

    beforeAll(async () => {
        mongoConnection = await connect(true);

        mongoVideosRepository = new MongoVideosRepository();

        const data = {
            title: 'title',
            description: 'description',
            url: uuid(),
        };

        videoSut = await mongoVideosRepository.createAndSave(data);
    });

    afterAll(async () => {
        await stopMongo();
        await mongoConnection[0].close();
    });

    it('should be able to create a new video', async () => {
        const data = {
            title: 'title',
            description: 'description',
            url: uuid(),
        };

        const { _id, created_at, updated_at, deleted_at, ...entityProps } =
            await mongoVideosRepository.createAndSave(data);

        expect(_id).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
        expect(deleted_at).toBeNull();
        expect(data).toEqual(entityProps);
    });

    it('should be able to find video by id', async () => {
        const videoFound = await mongoVideosRepository.findById(videoSut._id as any);

        expect({ deleted_at: null, ...videoFound }).toEqual(videoSut);
    });

    it('should be able to find video by url', async () => {
        const videoFound = await mongoVideosRepository.findByUrl(videoSut.url);

        expect({ deleted_at: null, ...videoFound }).toEqual(videoSut);
    });

    it('should be able to list all videos', async () => {
        const videos = await mongoVideosRepository.list({});

        expect(videos.count).toBeGreaterThanOrEqual(1);
        expect(videos.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should be able to remove video', async () => {
        const videoRemoved = await mongoVideosRepository.remove(videoSut);

        expect(videoRemoved.deleted_at).not.toBeUndefined();
    });
});
