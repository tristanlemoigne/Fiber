import { NgModule } from '@angular/core';
import { AbsoluteDrag} from './absolute-drag/absolute-drag';
import { AccueilPage } from '../pages/accueil/accueil';

@NgModule({
	declarations: [AbsoluteDrag, AccueilPage],
	imports: [AccueilPage],
	exports: [AbsoluteDrag]
})
export class DirectivesModule {}
