'use strict';

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgModule, DebugElement, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

import { Component } from '@angular/core';
import { SimpleModalServiceFactory } from '../simple-modal/simple-modal-service.factory';
import { SimpleModalService, SimpleModalServiceConfig } from '../simple-modal/simple-modal.service';
import { AlertComponent } from './mocks/basic-alert';
import { SimpleModalHolderComponentMock } from './mocks/simple-modal-holder.compoenent.mock';
import { SimpleModalHolderComponent } from '../simple-modal/simple-modal-holder.component';
import { SimpleModalWrapperComponent } from '../simple-modal/simple-modal-wrapper.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers';


const config: SimpleModalServiceConfig = {
  container: document.body
};

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent, SimpleModalWrapperComponent],
  entryComponents: [AlertComponent, SimpleModalWrapperComponent]
})
export class FakeTestAlertModule {}

describe('SimpleModalHolder', () => {

  let component: SimpleModalHolderComponent;
  let fixture: ComponentFixture<SimpleModalHolderComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FakeTestAlertModule],
      declarations: [SimpleModalHolderComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(SimpleModalHolderComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  });


  /**
   * Sanity check - it can be created
   */
  it('should be injected successfully', () => {
    expect(component).toBeDefined();
  });

  /**
   * Sanity check - API is as expected
   */
  it('should have a method called addModal', () => {
    expect(typeof component.addModal).toBe('function');
  });

  it('should have a method called removeModal', () => {
    expect(typeof component.removeModal).toBe('function');
  });

  it('should have a method called removeAllModals', () => {
    expect(typeof component.removeAllModals).toBe('function');
  });


  /**
   * Function tests
   */
  it('should add a modal to the modals array when adding', () => {
    expect(component.modals).toHaveLength(0);
    component.addModal(AlertComponent, {title: 'Alert title!'});
    expect(component.modals).toHaveLength(1);
  });

  it('should remove a modal to the modals array when removing', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, {title: 'Alert title!'});
    const modal = component.modals[0];
    return component.removeModal(modal).then( () => {
      expect(component.modals).toHaveLength(0);
    });

  });

  it('should remove a modal to the modals array when removing', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, {title: 'Alert title!'});
    const modal = component.modals[0];
    return component.removeModal(modal).then( () => {
      expect(component.modals).toHaveLength(0);
    });

  });

  it('should remove all modals when asked', () => {
    expect.assertions(2);
    component.addModal(AlertComponent, {title: 'Alert title1!'});
    component.addModal(AlertComponent, {title: 'Alert title2'});
    component.addModal(AlertComponent, {title: 'Alert title3!'});
    component.addModal(AlertComponent, {title: 'Alert title4'});
    expect(component.modals.length).toBe(4);
    return component.removeAllModals().then( () => {
      expect(component.modals).toHaveLength(0);
    });

  });

  it('should add a class to the body when a modal is added', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, {title: 'Alert title!'}, {animationDuration : 1});
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        expect(document.body.classList.contains('modal-open')).toBeTruthy();
        resolve(1);
      }, 2);
    });
  });


  it('should not remove class id modals are still showing ', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, {title: 'Alert title!'});
    component.addModal(AlertComponent, {title: 'Alert title2!'});
    const modal = component.modals[1];
    return component.removeModal(modal).then( () => {
      expect(document.body.classList.contains('modal-open')).toBeTruthy();
    });
  });

  it('should remove class if removing last modal ', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, {title: 'Alert title!'});
    const modal = component.modals[0];
    return component.removeModal(modal).then( () => {
      expect(document.body.classList.contains('modal-open')).toBeFalsy();
    });
  });




});
