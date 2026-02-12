import { TestBed } from '@angular/core/testing';

import { MessageFormService } from './message-form.service';

describe('MessageFormService', () => {
  let service: MessageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
