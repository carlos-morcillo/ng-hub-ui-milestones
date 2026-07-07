import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubMilestoneNodeDirective } from './milestone-node.directive';
import { HubMilestoneComponent } from './milestone.component';
import { HubMilestonesComponent, HubMilestonesOrientation } from './milestones.component';

@Component({
	standalone: true,
	imports: [HubMilestonesComponent, HubMilestoneComponent, HubMilestoneNodeDirective],
	template: `
		<hub-milestones [orientation]="orientation()">
			<hub-milestone state="complete">First</hub-milestone>
			<hub-milestone state="active" color="#e83e8c"><ng-template hubMilestoneNode>★</ng-template>Second</hub-milestone>
			<hub-milestone label="C">Third</hub-milestone>
			<hub-milestone state="error">Fourth</hub-milestone>
		</hub-milestones>
	`
})
class Host {
	orientation = signal<HubMilestonesOrientation>('vertical');
}

describe('HubMilestonesComponent', () => {
	let fixture: ComponentFixture<Host>;

	function milestones(): HTMLElement[] {
		return Array.from(fixture.nativeElement.querySelectorAll('.hub-milestone'));
	}
	function nodes(): HTMLElement[] {
		return Array.from(fixture.nativeElement.querySelectorAll('.hub-milestone__node'));
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [Host] });
		fixture = TestBed.createComponent(Host);
		fixture.detectChanges();
	});

	it('renders one node per projected milestone', () => {
		expect(milestones().length).toBe(4);
		expect(nodes().length).toBe(4);
	});

	it('auto-numbers nodes that have no template or label', () => {
		expect(nodes()[0].textContent?.trim()).toBe('1');
		expect(nodes()[3].textContent?.trim()).toBe('4');
	});

	it('renders custom node template content over the number', () => {
		expect(nodes()[1].textContent?.trim()).toBe('★');
	});

	it('renders the label when provided and there is no template', () => {
		expect(nodes()[2].textContent?.trim()).toBe('C');
	});

	it('applies the state modifier class per milestone', () => {
		expect(milestones()[0].classList.contains('hub-milestone--complete')).toBe(true);
		expect(milestones()[1].classList.contains('hub-milestone--active')).toBe(true);
		expect(milestones()[2].classList.contains('hub-milestone--pending')).toBe(true);
		expect(milestones()[3].classList.contains('hub-milestone--error')).toBe(true);
	});

	it('exposes the per-node color override as a CSS variable', () => {
		expect(milestones()[1].style.getPropertyValue('--hub-milestone-node-color')).toBe('#e83e8c');
	});

	it('resolves a semantic color name to the ds token with the raw word as fallback', () => {
		const node = TestBed.createComponent(HubMilestoneComponent);
		node.componentRef.setInput('color', 'primary');
		node.detectChanges();
		expect((node.nativeElement as HTMLElement).style.getPropertyValue('--hub-milestone-node-color')).toBe(
			'var(--hub-sys-color-primary, primary)'
		);
	});

	it('passes a literal color value through unchanged', () => {
		const node = TestBed.createComponent(HubMilestoneComponent);
		node.componentRef.setInput('color', '#ff0000');
		node.detectChanges();
		expect((node.nativeElement as HTMLElement).style.getPropertyValue('--hub-milestone-node-color')).toBe('#ff0000');
	});

	it('reflects the orientation on the host', () => {
		const host = fixture.nativeElement.querySelector('.hub-milestones') as HTMLElement;
		expect(host.classList.contains('hub-milestones--vertical')).toBe(true);

		fixture.componentInstance.orientation.set('horizontal');
		fixture.detectChanges();
		expect(host.classList.contains('hub-milestones--horizontal')).toBe(true);
		expect(host.classList.contains('hub-milestones--vertical')).toBe(false);
	});
});
