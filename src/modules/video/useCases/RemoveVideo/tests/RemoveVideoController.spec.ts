import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import Video from '../../../schemas/Video';
import { RemoveVideoController } from '../RemoveVideoController';
import { RemoveVideoUseCase } from '../RemoveVideoUseCase';

describe('RemoveVideoController Context', () => {
    let removeVideoUseCaseSpy: sinon.SinonStubbedInstance<RemoveVideoUseCase>;
    let removeVideoController: RemoveVideoController;
    let mockResponse: any;

    beforeEach(() => {
        removeVideoUseCaseSpy = sinon.createStubInstance(RemoveVideoUseCase);
        removeVideoController = new RemoveVideoController(
            removeVideoUseCaseSpy as any,
        );

        mockResponse = () => {
            const response: any = {};

            response.status = (status: any) => {
                response.status = status;
                return response;
            };

            response.send = () => response;

            return response;
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should remove video and return status 204', async () => {
        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
        };

        const mockedVideo: Video = {
            _id: id as any,
            title: 'title',
            description: 'description',
            url: 'url',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        };

        removeVideoUseCaseSpy.execute.resolves(mockedVideo);

        const response = await removeVideoController.handle(request, mockResponse());

        expect(response.status).toBe(204);
        expect(removeVideoUseCaseSpy.execute.calledOnceWithExactly(id)).toBeTruthy();
    });

    it('should return ValidationError when not send invalid id', async () => {
        expect.hasAssertions();

        const id = 'invalid-id';

        const request: any = {
            params: { id },
        };

        try {
            await removeVideoController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['id'])).toBeTruthy();
            expect(removeVideoUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });
});
