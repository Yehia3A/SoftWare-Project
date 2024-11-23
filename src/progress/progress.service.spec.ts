import {Test , TestingModule} from '@nestjs/testing'
import { progressService } from './progress.service'

describe('progressService' , () => {
    let service: progressService;

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [progressService],
        }).compile();

        service = module.get<progressService>(progressService);
    });

    it('should be defined' , () => {
        expect(service).toBeDefined();
    });
});