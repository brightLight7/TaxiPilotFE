import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]',
})
export class BackgroundColorDirective implements OnInit {
  @Input() cdDefault: boolean | undefined;
  @Input() cdDefaultD: boolean | undefined;
  @Input() cdPrimary: boolean | undefined;
  @Input() cdPrimaryD: boolean | undefined;
  @Input() cdSecondary: boolean | undefined;
  @Input() cdSecondaryD: boolean | undefined;
  @Input() cdSpecial: boolean | undefined;
  @Input() cdSpecialD: boolean | undefined;
  @Input() cdInfo: boolean | undefined;
  @Input() cdInfoD: boolean | undefined;
  @Input() cdSuccess: boolean | undefined;
  @Input() cdSuccessD: boolean | undefined;
  @Input() cdWarning: boolean | undefined;
  @Input() cdWarningD: boolean | undefined;
  @Input() cdDanger: boolean | undefined;
  @Input() DangerD: boolean | undefined;
  @Input() cdDangerD: boolean | undefined;
  @Input() cdElegant: boolean | undefined;
  @Input() cdElegantD: boolean | undefined;
  @Input() cdStylish: boolean | undefined;
  @Input() cdStylishD: boolean | undefined;
  @Input() cdUnique: boolean | undefined;
  @Input() cdUniqueD: boolean | undefined;

  @Input() cdRed0: boolean | undefined; 
@Input() cdRed1: boolean | undefined; 
@Input() cdRed2: boolean | undefined; 
@Input() cdRed3: boolean | undefined; 
@Input() cdRed4: boolean | undefined; 
@Input() cdRed5: boolean | undefined; 
@Input() cdRed6: boolean | undefined; 
@Input() cdRed7: boolean | undefined; 
@Input() cdRed8: boolean | undefined; 
@Input() cdRed9: boolean | undefined; 
@Input() cdRed10: boolean | undefined; 
@Input() cdRed11: boolean | undefined; 
@Input() cdRed12: boolean | undefined; 
@Input() cdRed13: boolean | undefined; 
@Input() cdPink0: boolean | undefined; 
@Input() cdPink1: boolean | undefined; 
@Input() cdPink2: boolean | undefined; 
@Input() cdPink3: boolean | undefined; 
@Input() cdPink4: boolean | undefined; 
@Input() cdPink5: boolean | undefined; 
@Input() cdPink6: boolean | undefined; 
@Input() cdPink7: boolean | undefined; 
@Input() cdPink8: boolean | undefined; 
@Input() cdPink9: boolean | undefined; 
@Input() cdPink10: boolean | undefined; 
@Input() cdPink11: boolean | undefined; 
@Input() cdPink12: boolean | undefined; 
@Input() cdPink13: boolean | undefined; 
@Input() cdPurple0: boolean | undefined; 
@Input() cdPurple1: boolean | undefined; 
@Input() cdPurple2: boolean | undefined; 
@Input() cdPurple3: boolean | undefined; 
@Input() cdPurple4: boolean | undefined; 
@Input() cdPurple5: boolean | undefined; 
@Input() cdPurple6: boolean | undefined; 
@Input() cdPurple7: boolean | undefined; 
@Input() cdPurple8: boolean | undefined; 
@Input() cdPurple9: boolean | undefined; 
@Input() cdPurple10: boolean | undefined; 
@Input() cdPurple11: boolean | undefined; 
@Input() cdPurple12: boolean | undefined; 
@Input() cdPurple13: boolean | undefined; 
@Input() cdDeeppurple0: boolean | undefined; 
@Input() cdDeeppurple1: boolean | undefined; 
@Input() cdDeeppurple2: boolean | undefined; 
@Input() cdDeeppurple3: boolean | undefined; 
@Input() cdDeeppurple4: boolean | undefined; 
@Input() cdDeeppurple5: boolean | undefined; 
@Input() cdDeeppurple6: boolean | undefined; 
@Input() cdDeeppurple7: boolean | undefined; 
@Input() cdDeeppurple8: boolean | undefined; 
@Input() cdDeeppurple9: boolean | undefined; 
@Input() cdDeeppurple10: boolean | undefined; 
@Input() cdDeeppurple11: boolean | undefined; 
@Input() cdDeeppurple12: boolean | undefined; 
@Input() cdDeeppurple13: boolean | undefined; 
@Input() cdIndigo0: boolean | undefined; 
@Input() cdIndigo1: boolean | undefined; 
@Input() cdIndigo2: boolean | undefined; 
@Input() cdIndigo3: boolean | undefined; 
@Input() cdIndigo4: boolean | undefined; 
@Input() cdIndigo5: boolean | undefined; 
@Input() cdIndigo6: boolean | undefined; 
@Input() cdIndigo7: boolean | undefined; 
@Input() cdIndigo8: boolean | undefined; 
@Input() cdIndigo9: boolean | undefined; 
@Input() cdIndigo10: boolean | undefined; 
@Input() cdIndigo11: boolean | undefined; 
@Input() cdIndigo12: boolean | undefined; 
@Input() cdIndigo13: boolean | undefined; 
@Input() cdBlue0: boolean | undefined; 
@Input() cdBlue1: boolean | undefined; 
@Input() cdBlue2: boolean | undefined; 
@Input() cdBlue3: boolean | undefined; 
@Input() cdBlue4: boolean | undefined; 
@Input() cdBlue5: boolean | undefined; 
@Input() cdBlue6: boolean | undefined; 
@Input() cdBlue7: boolean | undefined; 
@Input() cdBlue8: boolean | undefined; 
@Input() cdBlue9: boolean | undefined; 
@Input() cdBlue10: boolean | undefined; 
@Input() cdBlue11: boolean | undefined; 
@Input() cdBlue12: boolean | undefined; 
@Input() cdBlue13: boolean | undefined; 
@Input() cdLightblue0: boolean | undefined; 
@Input() cdLightblue1: boolean | undefined; 
@Input() cdLightblue2: boolean | undefined; 
@Input() cdLightblue3: boolean | undefined; 
@Input() cdLightblue4: boolean | undefined; 
@Input() cdLightblue5: boolean | undefined; 
@Input() cdLightblue6: boolean | undefined; 
@Input() cdLightblue7: boolean | undefined; 
@Input() cdLightblue8: boolean | undefined; 
@Input() cdLightblue9: boolean | undefined; 
@Input() cdLightblue10: boolean | undefined; 
@Input() cdLightblue11: boolean | undefined; 
@Input() cdLightblue12: boolean | undefined; 
@Input() cdLightblue13: boolean | undefined; 
@Input() cdCyan0: boolean | undefined; 
@Input() cdCyan1: boolean | undefined; 
@Input() cdCyan2: boolean | undefined; 
@Input() cdCyan3: boolean | undefined; 
@Input() cdCyan4: boolean | undefined; 
@Input() cdCyan5: boolean | undefined; 
@Input() cdCyan6: boolean | undefined; 
@Input() cdCyan7: boolean | undefined; 
@Input() cdCyan8: boolean | undefined; 
@Input() cdCyan9: boolean | undefined; 
@Input() cdCyan10: boolean | undefined; 
@Input() cdCyan11: boolean | undefined; 
@Input() cdCyan12: boolean | undefined; 
@Input() cdCyan13: boolean | undefined; 
@Input() cdTeal0: boolean | undefined; 
@Input() cdTeal1: boolean | undefined; 
@Input() cdTeal2: boolean | undefined; 
@Input() cdTeal3: boolean | undefined; 
@Input() cdTeal4: boolean | undefined; 
@Input() cdTeal5: boolean | undefined; 
@Input() cdTeal6: boolean | undefined; 
@Input() cdTeal7: boolean | undefined; 
@Input() cdTeal8: boolean | undefined; 
@Input() cdTeal9: boolean | undefined; 
@Input() cdTeal10: boolean | undefined; 
@Input() cdTeal11: boolean | undefined; 
@Input() cdTeal12: boolean | undefined; 
@Input() cdTeal13: boolean | undefined; 
@Input() cdGreen0: boolean | undefined; 
@Input() cdGreen1: boolean | undefined; 
@Input() cdGreen2: boolean | undefined; 
@Input() cdGreen3: boolean | undefined; 
@Input() cdGreen4: boolean | undefined; 
@Input() cdGreen5: boolean | undefined; 
@Input() cdGreen6: boolean | undefined; 
@Input() cdGreen7: boolean | undefined; 
@Input() cdGreen8: boolean | undefined; 
@Input() cdGreen9: boolean | undefined; 
@Input() cdGreen10: boolean | undefined; 
@Input() cdGreen11: boolean | undefined; 
@Input() cdGreen12: boolean | undefined; 
@Input() cdGreen13: boolean | undefined; 
@Input() cdLightgreen0: boolean | undefined; 
@Input() cdLightgreen1: boolean | undefined; 
@Input() cdLightgreen2: boolean | undefined; 
@Input() cdLightgreen3: boolean | undefined; 
@Input() cdLightgreen4: boolean | undefined; 
@Input() cdLightgreen5: boolean | undefined; 
@Input() cdLightgreen6: boolean | undefined; 
@Input() cdLightgreen7: boolean | undefined; 
@Input() cdLightgreen8: boolean | undefined; 
@Input() cdLightgreen9: boolean | undefined; 
@Input() cdLightgreen10: boolean | undefined; 
@Input() cdLightgreen11: boolean | undefined; 
@Input() cdLightgreen12: boolean | undefined; 
@Input() cdLightgreen13: boolean | undefined; 
@Input() cdLime0: boolean | undefined; 
@Input() cdLime1: boolean | undefined; 
@Input() cdLime2: boolean | undefined; 
@Input() cdLime3: boolean | undefined; 
@Input() cdLime4: boolean | undefined; 
@Input() cdLime5: boolean | undefined; 
@Input() cdLime6: boolean | undefined; 
@Input() cdLime7: boolean | undefined; 
@Input() cdLime8: boolean | undefined; 
@Input() cdLime9: boolean | undefined; 
@Input() cdLime10: boolean | undefined; 
@Input() cdLime11: boolean | undefined; 
@Input() cdLime12: boolean | undefined; 
@Input() cdLime13: boolean | undefined; 
@Input() cdYellow0: boolean | undefined; 
@Input() cdYellow1: boolean | undefined; 
@Input() cdYellow2: boolean | undefined; 
@Input() cdYellow3: boolean | undefined; 
@Input() cdYellow4: boolean | undefined; 
@Input() cdYellow5: boolean | undefined; 
@Input() cdYellow6: boolean | undefined; 
@Input() cdYellow7: boolean | undefined; 
@Input() cdYellow8: boolean | undefined; 
@Input() cdYellow9: boolean | undefined; 
@Input() cdYellow10: boolean | undefined; 
@Input() cdYellow11: boolean | undefined; 
@Input() cdYellow12: boolean | undefined; 
@Input() cdYellow13: boolean | undefined; 
@Input() cdAmber0: boolean | undefined; 
@Input() cdAmber1: boolean | undefined; 
@Input() cdAmber2: boolean | undefined; 
@Input() cdAmber3: boolean | undefined; 
@Input() cdAmber4: boolean | undefined; 
@Input() cdAmber5: boolean | undefined; 
@Input() cdAmber6: boolean | undefined; 
@Input() cdAmber7: boolean | undefined; 
@Input() cdAmber8: boolean | undefined; 
@Input() cdAmber9: boolean | undefined; 
@Input() cdAmber10: boolean | undefined; 
@Input() cdAmber11: boolean | undefined; 
@Input() cdAmber12: boolean | undefined; 
@Input() cdAmber13: boolean | undefined; 
@Input() cdOrange0: boolean | undefined; 
@Input() cdOrange1: boolean | undefined; 
@Input() cdOrange2: boolean | undefined; 
@Input() cdOrange3: boolean | undefined; 
@Input() cdOrange4: boolean | undefined; 
@Input() cdOrange5: boolean | undefined; 
@Input() cdOrange6: boolean | undefined; 
@Input() cdOrange7: boolean | undefined; 
@Input() cdOrange8: boolean | undefined; 
@Input() cdOrange9: boolean | undefined; 
@Input() cdOrange10: boolean | undefined; 
@Input() cdOrange11: boolean | undefined; 
@Input() cdOrange12: boolean | undefined; 
@Input() cdOrange13: boolean | undefined;
@Input() cdDeepOrange0: boolean | undefined; 
@Input() cdDeepOrange1: boolean | undefined; 
@Input() cdDeepOrange2: boolean | undefined; 
@Input() cdDeepOrange3: boolean | undefined; 
@Input() cdDeepOrange4: boolean | undefined; 
@Input() cdDeepOrange5: boolean | undefined; 
@Input() cdDeepOrange6: boolean | undefined; 
@Input() cdDeepOrange7: boolean | undefined; 
@Input() cdDeepOrange8: boolean | undefined; 
@Input() cdDeepOrange9: boolean | undefined; 
@Input() cdDeepOrange10: boolean | undefined; 
@Input() cdDeepOrange11: boolean | undefined; 
@Input() cdDeepOrange12: boolean | undefined; 
@Input() cdDeepOrange13: boolean | undefined; 
@Input() cdBrown0: boolean | undefined; 
@Input() cdBrown1: boolean | undefined; 
@Input() cdBrown2: boolean | undefined; 
@Input() cdBrown3: boolean | undefined; 
@Input() cdBrown4: boolean | undefined; 
@Input() cdBrown5: boolean | undefined; 
@Input() cdBrown6: boolean | undefined; 
@Input() cdBrown7: boolean | undefined; 
@Input() cdBrown8: boolean | undefined; 
@Input() cdBrown9: boolean | undefined; 
@Input() cdGray0: boolean | undefined; 
@Input() cdGray1: boolean | undefined; 
@Input() cdGray2: boolean | undefined; 
@Input() cdGray3: boolean | undefined; 
@Input() cdGray4: boolean | undefined; 
@Input() cdGray5: boolean | undefined; 
@Input() cdGray6: boolean | undefined; 
@Input() cdGray7: boolean | undefined; 
@Input() cdGray8: boolean | undefined; 
@Input() cdGray9: boolean | undefined; 
@Input() cdBlueGray0: boolean | undefined; 
@Input() cdBlueGray1: boolean | undefined; 
@Input() cdBlueGray2: boolean | undefined; 
@Input() cdBlueGray3: boolean | undefined; 
@Input() cdBlueGray6: boolean | undefined; 
@Input() cdBlueGray7: boolean | undefined; 
@Input() cdBlueGray8: boolean | undefined; 
@Input() cdBlueGray9: boolean | undefined; 
@Input()  cdBorderRadius: boolean | undefined;
@Input() cdShadow: boolean | undefined;

@Input() BackgroundColor: string | undefined;


  constructor(private eRef: ElementRef) {}
  ngOnInit(): void {
    //#region if backgrounf color
    if (this.cdDefault === true) {
      this.eRef.nativeElement.style.backgroundColor = 'white';  this.eRef.nativeElement.style.color = 'black !important';
    } 
      else if (this.cdDefaultD === true) { this.eRef.nativeElement.style.backgroundColor = '#00695C';    } 
      else if (this.cdPrimary === true) { this.eRef.nativeElement.style.backgroundColor = '#4285F4'; }
     else if (this.cdPrimaryD === true) {
      this.eRef.nativeElement.style.backgroundColor = '#0D47A1';
    } else if (this.cdSecondary === true) {
      this.eRef.nativeElement.style.backgroundColor = '#AA66CC';
    } else if (this.cdSecondaryD === true) {
      this.eRef.nativeElement.style.backgroundColor = '#9933CC';
    }
    else if (this.cdInfo === true) {
      this.eRef.nativeElement.style.backgroundColor = '#33B5E5';
    } 
    else if (this.cdInfoD === true) {
      this.eRef.nativeElement.style.backgroundColor = '#0099CC';
    } else if (this.cdSuccess === true) {
      this.eRef.nativeElement.style.backgroundColor = '#00C851';
    } else if (this.cdSuccessD === true) {
      this.eRef.nativeElement.style.backgroundColor = '#007E33';
    } else if (this.cdWarning === true) {
      this.eRef.nativeElement.style.backgroundColor = '#F3B230';
    } else if (this.cdWarningD === true) {
      this.eRef.nativeElement.style.backgroundColor = '#FF8800';
    } 
    else if (this.cdDanger === true) {
       this.eRef.nativeElement.style.backgroundColor = '#FF3547';
     } else if (this.cdDangerD === true) {
       this.eRef.nativeElement.style.backgroundColor = '#FFFFFF';
     } else if (this.cdElegant === true) {
       this.eRef.nativeElement.style.backgroundColor = '#2E2E2E';
     } else if (this.cdElegantD === true) {
       this.eRef.nativeElement.style.backgroundColor = '#212121';
     } else if (this.cdStylish === true) {
       this.eRef.nativeElement.style.backgroundColor = '#4B515D';
     } else if (this.cdStylishD === true) {
       this.eRef.nativeElement.style.backgroundColor = '#3E4551';
     } else if (this.cdUnique === true) {
       this.eRef.nativeElement.style.backgroundColor = '#3F729B';
     } else if (this.cdUniqueD === true) {
       this.eRef.nativeElement.style.backgroundColor = '#1C2331';
     } 
    else if (this.cdSpecial === true) {
      this.eRef.nativeElement.style.backgroundColor = '#37474F';
    }
    else if (this.cdSpecialD === true) {
      this.eRef.nativeElement.style.backgroundColor = '#263238';
    }
    else if (this.cdRed0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFEBEE';}
    else if (this.cdRed1 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFCDD2';}
    else if (this.cdRed2 === true) { this.eRef.nativeElement.style.backgroundColor = '#EF9A9A';}
    else if (this.cdRed3 === true) { this.eRef.nativeElement.style.backgroundColor = '#E57373';}
    else if (this.cdRed4 === true) { this.eRef.nativeElement.style.backgroundColor = '#EF5350';}
    else if (this.cdRed5 === true) { this.eRef.nativeElement.style.backgroundColor = '#F44336';}
    else if (this.cdRed6 === true) { this.eRef.nativeElement.style.backgroundColor = '#E53935';}
    else if (this.cdRed7 === true) { this.eRef.nativeElement.style.backgroundColor = '#D32F2F';}
    else if (this.cdRed8 === true) { this.eRef.nativeElement.style.backgroundColor = '#C62828';}
    else if (this.cdRed9 === true) { this.eRef.nativeElement.style.backgroundColor = '#B71C1C';}
    else if (this.cdRed10 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF8A80';}
    else if (this.cdRed11 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF5252';}
    else if (this.cdRed12 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF1744';}
    else if (this.cdRed13 === true) { this.eRef.nativeElement.style.backgroundColor = '#D50000';}
    else if (this.cdPink0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FCE4EC';}
    else if (this.cdPink1 === true) { this.eRef.nativeElement.style.backgroundColor = '#F8BBD0';}
    else if (this.cdPink2 === true) { this.eRef.nativeElement.style.backgroundColor = '#F48FB1';}
    else if (this.cdPink3 === true) { this.eRef.nativeElement.style.backgroundColor = '#F06292';}
    else if (this.cdPink4 === true) { this.eRef.nativeElement.style.backgroundColor = '#EC407A';}
    else if (this.cdPink5 === true) { this.eRef.nativeElement.style.backgroundColor = '#E91E63';}
    else if (this.cdPink6 === true) { this.eRef.nativeElement.style.backgroundColor = '#D81B60';}
    else if (this.cdPink7 === true) { this.eRef.nativeElement.style.backgroundColor = '#C2185B';}
    else if (this.cdPink8 === true) { this.eRef.nativeElement.style.backgroundColor = '#AD1457';}
    else if (this.cdPink9 === true) { this.eRef.nativeElement.style.backgroundColor = '#880E4F';}
    else if (this.cdPink10 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF80AB';}
    else if (this.cdPink11 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF4081';}
    else if (this.cdPink12 === true) { this.eRef.nativeElement.style.backgroundColor = '#F50057';}
    else if (this.cdPink13 === true) { this.eRef.nativeElement.style.backgroundColor = '#C51162';}
    else if (this.cdPurple0 === true) { this.eRef.nativeElement.style.backgroundColor = '#F3E5F5';}
    else if (this.cdPurple1 === true) { this.eRef.nativeElement.style.backgroundColor = '#E1BEE7';}
    else if (this.cdPurple2 === true) { this.eRef.nativeElement.style.backgroundColor = '#CE93D8';}
    else if (this.cdPurple3 === true) { this.eRef.nativeElement.style.backgroundColor = '#BA68C8';}
    else if (this.cdPurple4 === true) { this.eRef.nativeElement.style.backgroundColor = '#AB47BC';}
    else if (this.cdPurple5 === true) { this.eRef.nativeElement.style.backgroundColor = '#9C27B0';}
    else if (this.cdPurple6 === true) { this.eRef.nativeElement.style.backgroundColor = '#8E24AA';}
    else if (this.cdPurple7 === true) { this.eRef.nativeElement.style.backgroundColor = '#7B1FA2';}
    else if (this.cdPurple8 === true) { this.eRef.nativeElement.style.backgroundColor = '#6A1B9A';}
    else if (this.cdPurple9 === true) { this.eRef.nativeElement.style.backgroundColor = '#4A148C';}
    else if (this.cdPurple10 === true) { this.eRef.nativeElement.style.backgroundColor = '#EA80FC';}
    else if (this.cdPurple11 === true) { this.eRef.nativeElement.style.backgroundColor = '#E040FB';}
    else if (this.cdPurple12 === true) { this.eRef.nativeElement.style.backgroundColor = '#D500F9';}
    else if (this.cdPurple13 === true) { this.eRef.nativeElement.style.backgroundColor = '#AA00FF';}
    else if (this.cdDeeppurple0 === true) { this.eRef.nativeElement.style.backgroundColor = '#EDE7F6';}
    else if (this.cdDeeppurple1 === true) { this.eRef.nativeElement.style.backgroundColor = '#D1C4E9';}
    else if (this.cdDeeppurple2 === true) { this.eRef.nativeElement.style.backgroundColor = '#B39DDB';}
    else if (this.cdDeeppurple3 === true) { this.eRef.nativeElement.style.backgroundColor = '#9575CD';}
    else if (this.cdDeeppurple4 === true) { this.eRef.nativeElement.style.backgroundColor = '#7E57C2';}
    else if (this.cdDeeppurple5 === true) { this.eRef.nativeElement.style.backgroundColor = '#673AB7';}
    else if (this.cdDeeppurple6 === true) { this.eRef.nativeElement.style.backgroundColor = '#5E35B1';}
    else if (this.cdDeeppurple7 === true) { this.eRef.nativeElement.style.backgroundColor = '#512DA8';}
    else if (this.cdDeeppurple8 === true) { this.eRef.nativeElement.style.backgroundColor = '#4527A0';}
    else if (this.cdDeeppurple9 === true) { this.eRef.nativeElement.style.backgroundColor = '#311B92';}
    else if (this.cdDeeppurple10 === true) { this.eRef.nativeElement.style.backgroundColor = '#B388FF';}
    else if (this.cdDeeppurple11 === true) { this.eRef.nativeElement.style.backgroundColor = '#7C4DFF';}
    else if (this.cdDeeppurple12 === true) { this.eRef.nativeElement.style.backgroundColor = '#651FFF';}
    else if (this.cdDeeppurple13 === true) { this.eRef.nativeElement.style.backgroundColor = '#6200EA';}
    else if (this.cdIndigo0 === true) { this.eRef.nativeElement.style.backgroundColor = '#E8EAF6';}
    else if (this.cdIndigo1 === true) { this.eRef.nativeElement.style.backgroundColor = '#C5CAE9';}
    else if (this.cdIndigo2 === true) { this.eRef.nativeElement.style.backgroundColor = '#9FA8DA';}
    else if (this.cdIndigo3 === true) { this.eRef.nativeElement.style.backgroundColor = '#7986CB';}
    else if (this.cdIndigo4 === true) { this.eRef.nativeElement.style.backgroundColor = '#5C6BC0';}
    else if (this.cdIndigo5 === true) { this.eRef.nativeElement.style.backgroundColor = '#3F51B5';}
    else if (this.cdIndigo6 === true) { this.eRef.nativeElement.style.backgroundColor = '#3949AB';}
    else if (this.cdIndigo7 === true) { this.eRef.nativeElement.style.backgroundColor = '#303F9F';}
    else if (this.cdIndigo8 === true) { this.eRef.nativeElement.style.backgroundColor = '#283593';}
    else if (this.cdIndigo9 === true) { this.eRef.nativeElement.style.backgroundColor = '#1A237E';}
    else if (this.cdIndigo10 === true) { this.eRef.nativeElement.style.backgroundColor = '#8C9EFF';}
    else if (this.cdIndigo11 === true) { this.eRef.nativeElement.style.backgroundColor = '#536DFE';}
    else if (this.cdIndigo12 === true) { this.eRef.nativeElement.style.backgroundColor = '#3D5AFE';}
    else if (this.cdIndigo13 === true) { this.eRef.nativeElement.style.backgroundColor = '#304FFE';}
    else if (this.cdBlue0 === true) { this.eRef.nativeElement.style.backgroundColor = '#E3F2FD';}
    else if (this.cdBlue1 === true) { this.eRef.nativeElement.style.backgroundColor = '#BBDEFB';}
    else if (this.cdBlue2 === true) { this.eRef.nativeElement.style.backgroundColor = '#90CAF9';}
    else if (this.cdBlue3 === true) { this.eRef.nativeElement.style.backgroundColor = '#64B5F6';}
    else if (this.cdBlue4 === true) { this.eRef.nativeElement.style.backgroundColor = '#42A5F5';}
    else if (this.cdBlue5 === true) { this.eRef.nativeElement.style.backgroundColor = '#2196F3';}
    else if (this.cdBlue6 === true) { this.eRef.nativeElement.style.backgroundColor = '#1E88E5';}
    else if (this.cdBlue7 === true) { this.eRef.nativeElement.style.backgroundColor = '#1976D2';}
    else if (this.cdBlue8 === true) { this.eRef.nativeElement.style.backgroundColor = '#1565C0';}
    else if (this.cdBlue9 === true) { this.eRef.nativeElement.style.backgroundColor = '#0D47A1';}
    else if (this.cdBlue10 === true) { this.eRef.nativeElement.style.backgroundColor = '#82B1FF';}
    else if (this.cdBlue11 === true) { this.eRef.nativeElement.style.backgroundColor = '#448AFF';}
    else if (this.cdBlue12 === true) { this.eRef.nativeElement.style.backgroundColor = '#2979FF';}
    else if (this.cdBlue13 === true) { this.eRef.nativeElement.style.backgroundColor = '#2962FF';}
    else if (this.cdLightblue0 === true) { this.eRef.nativeElement.style.backgroundColor = '#E1F5FE';}
    else if (this.cdLightblue1 === true) { this.eRef.nativeElement.style.backgroundColor = '#B3E5FC';}
    else if (this.cdLightblue2 === true) { this.eRef.nativeElement.style.backgroundColor = '#81D4FA';}
    else if (this.cdLightblue3 === true) { this.eRef.nativeElement.style.backgroundColor = '#4FC3F7';}
    else if (this.cdLightblue4 === true) { this.eRef.nativeElement.style.backgroundColor = '#29B6F6';}
    else if (this.cdLightblue5 === true) { this.eRef.nativeElement.style.backgroundColor = '#03A9F4';}
    else if (this.cdLightblue6 === true) { this.eRef.nativeElement.style.backgroundColor = '#039BE5';}
    else if (this.cdLightblue7 === true) { this.eRef.nativeElement.style.backgroundColor = '#0288D1';}
    else if (this.cdLightblue8 === true) { this.eRef.nativeElement.style.backgroundColor = '#0277BD';}
    else if (this.cdLightblue9 === true) { this.eRef.nativeElement.style.backgroundColor = '#01579B';}
    else if (this.cdLightblue10 === true) { this.eRef.nativeElement.style.backgroundColor = '#80D8FF';}
    else if (this.cdLightblue11 === true) { this.eRef.nativeElement.style.backgroundColor = '#40C4FF';}
    else if (this.cdLightblue12 === true) { this.eRef.nativeElement.style.backgroundColor = '#00B0FF';}
    else if (this.cdLightblue13 === true) { this.eRef.nativeElement.style.backgroundColor = '#0091EA';}
    else if (this.cdCyan0 === true) { this.eRef.nativeElement.style.backgroundColor = '#E0F7FA';}
    else if (this.cdCyan1 === true) { this.eRef.nativeElement.style.backgroundColor = '#B2EBF2';}
    else if (this.cdCyan2 === true) { this.eRef.nativeElement.style.backgroundColor = '#80DEEA';}
    else if (this.cdCyan3 === true) { this.eRef.nativeElement.style.backgroundColor = '#4DD0E1';}
    else if (this.cdCyan4 === true) { this.eRef.nativeElement.style.backgroundColor = '#26C6DA';}
    else if (this.cdCyan5 === true) { this.eRef.nativeElement.style.backgroundColor = '#00BCD4';}
    else if (this.cdCyan6 === true) { this.eRef.nativeElement.style.backgroundColor = '#00ACC1';}
    else if (this.cdCyan7 === true) { this.eRef.nativeElement.style.backgroundColor = '#0097A7';}
    else if (this.cdCyan8 === true) { this.eRef.nativeElement.style.backgroundColor = '#00838F';}
    else if (this.cdCyan9 === true) { this.eRef.nativeElement.style.backgroundColor = '#6064';}
    else if (this.cdCyan10 === true) { this.eRef.nativeElement.style.backgroundColor = '#84FFFF';}
    else if (this.cdCyan11 === true) { this.eRef.nativeElement.style.backgroundColor = '#18FFFF';}
    else if (this.cdCyan12 === true) { this.eRef.nativeElement.style.backgroundColor = '#00E5FF';}
    else if (this.cdCyan13 === true) { this.eRef.nativeElement.style.backgroundColor = '#00B8D4';}
    else if (this.cdTeal0 === true) { this.eRef.nativeElement.style.backgroundColor = '#E0F2F1';}
    else if (this.cdTeal1 === true) { this.eRef.nativeElement.style.backgroundColor = '#B2DFDB';}
    else if (this.cdTeal2 === true) { this.eRef.nativeElement.style.backgroundColor = '#80CBC4';}
    else if (this.cdTeal3 === true) { this.eRef.nativeElement.style.backgroundColor = '#4DB6AC';}
    else if (this.cdTeal4 === true) { this.eRef.nativeElement.style.backgroundColor = '#26A69A';}
    else if (this.cdTeal5 === true) { this.eRef.nativeElement.style.backgroundColor = '#26A69A';}
    else if (this.cdTeal6 === true) { this.eRef.nativeElement.style.backgroundColor = '#00897B';}
    else if (this.cdTeal7 === true) { this.eRef.nativeElement.style.backgroundColor = '#00796B';}
    else if (this.cdTeal8 === true) { this.eRef.nativeElement.style.backgroundColor = '#00695C';}
    else if (this.cdTeal9 === true) { this.eRef.nativeElement.style.backgroundColor = '#004D40';}
    else if (this.cdTeal10 === true) { this.eRef.nativeElement.style.backgroundColor = '#A7FFEB';}
    else if (this.cdTeal11 === true) { this.eRef.nativeElement.style.backgroundColor = '#64FFDA';}
    else if (this.cdTeal12 === true) { this.eRef.nativeElement.style.backgroundColor = '#1DE9B6';}
    else if (this.cdTeal13 === true) { this.eRef.nativeElement.style.backgroundColor = '#00BFA5';}
    else if (this.cdGreen0 === true) { this.eRef.nativeElement.style.backgroundColor = '#E8F5E9';}
    else if (this.cdGreen1 === true) { this.eRef.nativeElement.style.backgroundColor = '#C8E6C9';}
    else if (this.cdGreen2 === true) { this.eRef.nativeElement.style.backgroundColor = '#A5D6A7';}
    else if (this.cdGreen3 === true) { this.eRef.nativeElement.style.backgroundColor = '#81C784';}
    else if (this.cdGreen4 === true) { this.eRef.nativeElement.style.backgroundColor = '#66BB6A';}
    else if (this.cdGreen5 === true) { this.eRef.nativeElement.style.backgroundColor = '#4CAF50';}
    else if (this.cdGreen6 === true) { this.eRef.nativeElement.style.backgroundColor = '#43A047';}
    else if (this.cdGreen7 === true) { this.eRef.nativeElement.style.backgroundColor = '#388E3C';}
    else if (this.cdGreen8 === true) { this.eRef.nativeElement.style.backgroundColor = '#2E7D32';}
    else if (this.cdGreen9 === true) { this.eRef.nativeElement.style.backgroundColor = '#1B5E20';}
    else if (this.cdGreen10 === true) { this.eRef.nativeElement.style.backgroundColor = '#B9F6CA';}
    else if (this.cdGreen11 === true) { this.eRef.nativeElement.style.backgroundColor = '#69F0AE';}
    else if (this.cdGreen12 === true) { this.eRef.nativeElement.style.backgroundColor = '#00E676';}
    else if (this.cdGreen13 === true) { this.eRef.nativeElement.style.backgroundColor = '#00C853';}
    else if (this.cdLightgreen0 === true) { this.eRef.nativeElement.style.backgroundColor = '#F1F8E9';}
    else if (this.cdLightgreen1 === true) { this.eRef.nativeElement.style.backgroundColor = '#DCEDC8';}
    else if (this.cdLightgreen2 === true) { this.eRef.nativeElement.style.backgroundColor = '#C5E1A5';}
    else if (this.cdLightgreen3 === true) { this.eRef.nativeElement.style.backgroundColor = '#AED581';}
    else if (this.cdLightgreen4 === true) { this.eRef.nativeElement.style.backgroundColor = '#9CCC65';}
    else if (this.cdLightgreen5 === true) { this.eRef.nativeElement.style.backgroundColor = '#8BC34A';}
    else if (this.cdLightgreen6 === true) { this.eRef.nativeElement.style.backgroundColor = '#7CB342';}
    else if (this.cdLightgreen7 === true) { this.eRef.nativeElement.style.backgroundColor = '#689F38';}
    else if (this.cdLightgreen8 === true) { this.eRef.nativeElement.style.backgroundColor = '#558B2F';}
    else if (this.cdLightgreen9 === true) { this.eRef.nativeElement.style.backgroundColor = '#33691E';}
    else if (this.cdLightgreen10 === true) { this.eRef.nativeElement.style.backgroundColor = '#CCFF90';}
    else if (this.cdLightgreen11 === true) { this.eRef.nativeElement.style.backgroundColor = '#B2FF59';}
    else if (this.cdLightgreen12 === true) { this.eRef.nativeElement.style.backgroundColor = '#76FF03';}
    else if (this.cdLightgreen13 === true) { this.eRef.nativeElement.style.backgroundColor = '#64DD17';}
    else if (this.cdLime0 === true) { this.eRef.nativeElement.style.backgroundColor = '#F9FBE7';}
    else if (this.cdLime1 === true) { this.eRef.nativeElement.style.backgroundColor = '#F0F4C3';}
    else if (this.cdLime2 === true) { this.eRef.nativeElement.style.backgroundColor = '#E6EE9C';}
    else if (this.cdLime3 === true) { this.eRef.nativeElement.style.backgroundColor = '#DCE775';}
    else if (this.cdLime4 === true) { this.eRef.nativeElement.style.backgroundColor = '#D4E157';}
    else if (this.cdLime5 === true) { this.eRef.nativeElement.style.backgroundColor = '#CDDC39';}
    else if (this.cdLime6 === true) { this.eRef.nativeElement.style.backgroundColor = '#C0CA33';}
    else if (this.cdLime7 === true) { this.eRef.nativeElement.style.backgroundColor = '#AFB42B';}
    else if (this.cdLime8 === true) { this.eRef.nativeElement.style.backgroundColor = '#9E9D24';}
    else if (this.cdLime9 === true) { this.eRef.nativeElement.style.backgroundColor = '#827717';}
    else if (this.cdLime10 === true) { this.eRef.nativeElement.style.backgroundColor = '#F4FF81';}
    else if (this.cdLime11 === true) { this.eRef.nativeElement.style.backgroundColor = '#EEFF41';}
    else if (this.cdLime12 === true) { this.eRef.nativeElement.style.backgroundColor = '#C6FF00';}
    else if (this.cdLime13 === true) { this.eRef.nativeElement.style.backgroundColor = '#AEEA00';}
    else if (this.cdYellow0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFFDE7';}
    else if (this.cdYellow1 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFF9C4';}
    else if (this.cdYellow2 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFF59D';}
    else if (this.cdYellow3 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFF176';}
    else if (this.cdYellow4 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFEE58';}
    else if (this.cdYellow5 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFEB3B';}
    else if (this.cdYellow6 === true) { this.eRef.nativeElement.style.backgroundColor = '#FDD835';}
    else if (this.cdYellow7 === true) { this.eRef.nativeElement.style.backgroundColor = '#FBC02D';}
    else if (this.cdYellow8 === true) { this.eRef.nativeElement.style.backgroundColor = '#F9A825';}
    else if (this.cdYellow9 === true) { this.eRef.nativeElement.style.backgroundColor = '#F57F17';}
    else if (this.cdYellow10 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFFF8D';}
    else if (this.cdYellow11 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFFF00';}
    else if (this.cdYellow12 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFEA00';}
    else if (this.cdYellow13 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFD600';}
    else if (this.cdAmber0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFF8E1';}
    else if (this.cdAmber1 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFECB3';}
    else if (this.cdAmber2 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFE082';}
    else if (this.cdAmber3 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFD54F';}
    else if (this.cdAmber4 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFCA28';}
    else if (this.cdAmber5 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFC107';}
    else if (this.cdAmber6 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFB300';}
    else if (this.cdAmber7 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFA000';}
    else if (this.cdAmber8 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF8F00';}
    else if (this.cdAmber9 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF6F00';}
    else if (this.cdAmber10 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFE57F';}
    else if (this.cdAmber11 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFD740';}
    else if (this.cdAmber12 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFC400';}
    else if (this.cdAmber13 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFAB00';}
    else if (this.cdOrange0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFF3E0';}
    else if (this.cdOrange1 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFE0B2';}
    else if (this.cdOrange2 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFCC80';}
    else if (this.cdOrange3 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFB74D';}
    else if (this.cdOrange4 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFA726';}
    else if (this.cdOrange5 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF9800';}
    else if (this.cdOrange6 === true) { this.eRef.nativeElement.style.backgroundColor = '#FB8C00';}
    else if (this.cdOrange7 === true) { this.eRef.nativeElement.style.backgroundColor = '#F57C00';}
    else if (this.cdOrange8 === true) { this.eRef.nativeElement.style.backgroundColor = '#EF6C00';}
    else if (this.cdOrange9 === true) { this.eRef.nativeElement.style.backgroundColor = '#E65100';}
    else if (this.cdOrange10 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFD180';}
    else if (this.cdOrange11 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFAB40';}
    else if (this.cdOrange12 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF9100';}
    else if (this.cdOrange13 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF6D00';}
    else if (this.cdDeepOrange0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FBE9E7';}
    else if (this.cdDeepOrange1 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFCCBC';}
    else if (this.cdDeepOrange2 === true) { this.eRef.nativeElement.style.backgroundColor = '#FFAB91';}
    else if (this.cdDeepOrange3 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF8A65';}
    else if (this.cdDeepOrange4 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF7043';}
    else if (this.cdDeepOrange5 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF5722';}
    else if (this.cdDeepOrange6 === true) { this.eRef.nativeElement.style.backgroundColor = '#F4511E';}
    else if (this.cdDeepOrange7 === true) { this.eRef.nativeElement.style.backgroundColor = '#E64A19';}
    else if (this.cdDeepOrange8 === true) { this.eRef.nativeElement.style.backgroundColor = '#D84315';}
    else if (this.cdDeepOrange9 === true) { this.eRef.nativeElement.style.backgroundColor = '#BF360C';}
    else if (this.cdDeepOrange10 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF9E80';}
    else if (this.cdDeepOrange11 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF6E40';}
    else if (this.cdDeepOrange12 === true) { this.eRef.nativeElement.style.backgroundColor = '#FF3D';}
    else if (this.cdDeepOrange13 === true) { this.eRef.nativeElement.style.backgroundColor = '#DD2C';}
    else if (this.cdBrown0 === true) { this.eRef.nativeElement.style.backgroundColor = '#EFEBE9';}
    else if (this.cdBrown1 === true) { this.eRef.nativeElement.style.backgroundColor = '#D7CCC8';}
    else if (this.cdBrown2 === true) { this.eRef.nativeElement.style.backgroundColor = '#BCAAA4';}
    else if (this.cdBrown3 === true) { this.eRef.nativeElement.style.backgroundColor = '#A1887F';}
    else if (this.cdBrown4 === true) { this.eRef.nativeElement.style.backgroundColor = '#8D6E63';}
    else if (this.cdBrown5 === true) { this.eRef.nativeElement.style.backgroundColor = '#795548';}
    else if (this.cdBrown6 === true) { this.eRef.nativeElement.style.backgroundColor = '#6D4C41';}
    else if (this.cdBrown7 === true) { this.eRef.nativeElement.style.backgroundColor = '#5D4037';}
    else if (this.cdBrown8 === true) { this.eRef.nativeElement.style.backgroundColor = '#4E342E';}
    else if (this.cdBrown9 === true) { this.eRef.nativeElement.style.backgroundColor = '#3E2723';}
    else if (this.cdGray0 === true) { this.eRef.nativeElement.style.backgroundColor = '#FAFAFA';}
    else if (this.cdGray1 === true) { this.eRef.nativeElement.style.backgroundColor = '#F5F5F5';}
    else if (this.cdGray2 === true) { this.eRef.nativeElement.style.backgroundColor = '#EEEEEE';}
    else if (this.cdGray3 === true) { this.eRef.nativeElement.style.backgroundColor = '#E0E0E0';}
    else if (this.cdGray4 === true) { this.eRef.nativeElement.style.backgroundColor = '#BDBDBD';}
    else if (this.cdGray5 === true) { this.eRef.nativeElement.style.backgroundColor = '#9E9E9E';}
    else if (this.cdGray6 === true) { this.eRef.nativeElement.style.backgroundColor = '#757575';}
    else if (this.cdGray7 === true) { this.eRef.nativeElement.style.backgroundColor = '#616161';}
    else if (this.cdGray8 === true) { this.eRef.nativeElement.style.backgroundColor = '#424242';}
    else if (this.cdGray9 === true) { this.eRef.nativeElement.style.backgroundColor = '#212121';}
    else if (this.cdBlueGray0 === true) { this.eRef.nativeElement.style.backgroundColor = '#ECEFF1';}
    else if (this.cdBlueGray1 === true) { this.eRef.nativeElement.style.backgroundColor = '#CFD8DC';}
    else if (this.cdBlueGray2 === true) { this.eRef.nativeElement.style.backgroundColor = '#B0BEC5';}
    else if (this.cdBlueGray3 === true) { this.eRef.nativeElement.style.backgroundColor = '#90A4AE';}
    else if (this.cdBlueGray6 === true) { this.eRef.nativeElement.style.backgroundColor = '#546E7A';}
    else if (this.cdBlueGray7 === true) { this.eRef.nativeElement.style.backgroundColor = '#455A64';}
    else if (this.cdBlueGray8 === true) { this.eRef.nativeElement.style.backgroundColor = '#37474F';}
    else if (this.cdBlueGray9 === true) { this.eRef.nativeElement.style.backgroundColor = '#263238';}
    else if (this.BackgroundColor !== '' || this.BackgroundColor !== undefined) { this.eRef.nativeElement.style.backgroundColor = this.BackgroundColor;}
    
//#endregion
    
    //#region other settings
        if (this.cdShadow === false) {
          this.eRef.nativeElement.style.boxShadow = 'none';
        } 

        if(this.cdBorderRadius == false )
        {
          this.eRef.nativeElement.style.borderRadius = '0px !important';
        } else
        {
          this.eRef.nativeElement.style.borderRadius = '3px !important';
        }
    //#endregion

  }
  
}
