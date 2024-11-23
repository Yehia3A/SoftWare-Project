import {Test, TestingModule} from '@nestjs/testing'
import { progressController } from './progress.controller'

describe(progressController , () => {
    let controller: progressController;

    beforeEach(async() =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [progressController],
        }).compile();

        controller = module.get<progressController>(progressController);
    });

    it('should be defined' , () =>{
        expect(controller).toBeDefined();
    });
});