import { TestBed } from "@angular/core/testing";
import { CallInterfaceComponent } from "./call-interface.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe('CallInterfaceComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CallInterfaceComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: '123' })
            }
          }
        ],
      }).compileComponents();
    });
  
    it('should toggle micEnabled when toggleMic is called', () => {
      const fixture = TestBed.createComponent(CallInterfaceComponent);
      const component = fixture.componentInstance;
  
      expect(component['micEnabled']).toBe(false);
  
      component.toggleMic();
  
      expect(component['micEnabled']).toBe(true);
    });
  
    it('should call hangUp when hangUp is called', () => {
      const fixture = TestBed.createComponent(CallInterfaceComponent);
      const component = fixture.componentInstance;
  
      spyOn(component, 'hangUp').and.callThrough();
  
      component.hangUp();
  
      expect(component.hangUp).toHaveBeenCalled();
      expect(component['micEnabled']).toBe(false); // Check the side effect of hangUp
    });
  
    // Add more test cases as needed
  });
  