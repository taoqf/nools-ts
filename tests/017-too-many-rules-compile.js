
const rule = `
rule Recurse0 {
	when {
		not(f : Fibonacci0 f.sequence == 1);
		f1 : Fibonacci0 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci0(f1.sequence - 1));
	}
}

rule Bootstrap0 {
	when {
		f : Fibonacci0 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate0 {
	when {
		f1 : Fibonacci0 f1.value != -1 {sequence : s1};
		f2 : Fibonacci0 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci0 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result0
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse1 {
	when {
		not(f : Fibonacci1 f.sequence == 1);
		f1 : Fibonacci1 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci1(f1.sequence - 1));
	}
}

rule Bootstrap1 {
	when {
		f : Fibonacci1 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate1 {
	when {
		f1 : Fibonacci1 f1.value != -1 {sequence : s1};
		f2 : Fibonacci1 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci1 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result1
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse2 {
	when {
		not(f : Fibonacci2 f.sequence == 1);
		f1 : Fibonacci2 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci2(f1.sequence - 1));
	}
}

rule Bootstrap2 {
	when {
		f : Fibonacci2 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate2 {
	when {
		f1 : Fibonacci2 f1.value != -1 {sequence : s1};
		f2 : Fibonacci2 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci2 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result2
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse3 {
	when {
		not(f : Fibonacci3 f.sequence == 1);
		f1 : Fibonacci3 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci3(f1.sequence - 1));
	}
}

rule Bootstrap3 {
	when {
		f : Fibonacci3 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate3 {
	when {
		f1 : Fibonacci3 f1.value != -1 {sequence : s1};
		f2 : Fibonacci3 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci3 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result3
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse4 {
	when {
		not(f : Fibonacci4 f.sequence == 1);
		f1 : Fibonacci4 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci4(f1.sequence - 1));
	}
}

rule Bootstrap4 {
	when {
		f : Fibonacci4 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate4 {
	when {
		f1 : Fibonacci4 f1.value != -1 {sequence : s1};
		f2 : Fibonacci4 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci4 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result4
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse5 {
	when {
		not(f : Fibonacci5 f.sequence == 1);
		f1 : Fibonacci5 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci5(f1.sequence - 1));
	}
}

rule Bootstrap5 {
	when {
		f : Fibonacci5 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate5 {
	when {
		f1 : Fibonacci5 f1.value != -1 {sequence : s1};
		f2 : Fibonacci5 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci5 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result5
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse6 {
	when {
		not(f : Fibonacci6 f.sequence == 1);
		f1 : Fibonacci6 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci6(f1.sequence - 1));
	}
}

rule Bootstrap6 {
	when {
		f : Fibonacci6 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate6 {
	when {
		f1 : Fibonacci6 f1.value != -1 {sequence : s1};
		f2 : Fibonacci6 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci6 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result6
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse7 {
	when {
		not(f : Fibonacci7 f.sequence == 1);
		f1 : Fibonacci7 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci7(f1.sequence - 1));
	}
}

rule Bootstrap7 {
	when {
		f : Fibonacci7 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate7 {
	when {
		f1 : Fibonacci7 f1.value != -1 {sequence : s1};
		f2 : Fibonacci7 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci7 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result7
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse8 {
	when {
		not(f : Fibonacci8 f.sequence == 1);
		f1 : Fibonacci8 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci8(f1.sequence - 1));
	}
}

rule Bootstrap8 {
	when {
		f : Fibonacci8 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate8 {
	when {
		f1 : Fibonacci8 f1.value != -1 {sequence : s1};
		f2 : Fibonacci8 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci8 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result8
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse9 {
	when {
		not(f : Fibonacci9 f.sequence == 1);
		f1 : Fibonacci9 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci9(f1.sequence - 1));
	}
}

rule Bootstrap9 {
	when {
		f : Fibonacci9 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate9 {
	when {
		f1 : Fibonacci9 f1.value != -1 {sequence : s1};
		f2 : Fibonacci9 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci9 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result9
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse10 {
	when {
		not(f : Fibonacci10 f.sequence == 1);
		f1 : Fibonacci10 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci10(f1.sequence - 1));
	}
}

rule Bootstrap10 {
	when {
		f : Fibonacci10 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate10 {
	when {
		f1 : Fibonacci10 f1.value != -1 {sequence : s1};
		f2 : Fibonacci10 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci10 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result10
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse11 {
	when {
		not(f : Fibonacci11 f.sequence == 1);
		f1 : Fibonacci11 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci11(f1.sequence - 1));
	}
}

rule Bootstrap11 {
	when {
		f : Fibonacci11 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate11 {
	when {
		f1 : Fibonacci11 f1.value != -1 {sequence : s1};
		f2 : Fibonacci11 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci11 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result11
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse12 {
	when {
		not(f : Fibonacci12 f.sequence == 1);
		f1 : Fibonacci12 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci12(f1.sequence - 1));
	}
}

rule Bootstrap12 {
	when {
		f : Fibonacci12 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate12 {
	when {
		f1 : Fibonacci12 f1.value != -1 {sequence : s1};
		f2 : Fibonacci12 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci12 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result12
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse13 {
	when {
		not(f : Fibonacci13 f.sequence == 1);
		f1 : Fibonacci13 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci13(f1.sequence - 1));
	}
}

rule Bootstrap13 {
	when {
		f : Fibonacci13 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate13 {
	when {
		f1 : Fibonacci13 f1.value != -1 {sequence : s1};
		f2 : Fibonacci13 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci13 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result13
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse14 {
	when {
		not(f : Fibonacci14 f.sequence == 1);
		f1 : Fibonacci14 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci14(f1.sequence - 1));
	}
}

rule Bootstrap14 {
	when {
		f : Fibonacci14 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate14 {
	when {
		f1 : Fibonacci14 f1.value != -1 {sequence : s1};
		f2 : Fibonacci14 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci14 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result14
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse15 {
	when {
		not(f : Fibonacci15 f.sequence == 1);
		f1 : Fibonacci15 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci15(f1.sequence - 1));
	}
}

rule Bootstrap15 {
	when {
		f : Fibonacci15 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate15 {
	when {
		f1 : Fibonacci15 f1.value != -1 {sequence : s1};
		f2 : Fibonacci15 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci15 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result15
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse16 {
	when {
		not(f : Fibonacci16 f.sequence == 1);
		f1 : Fibonacci16 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci16(f1.sequence - 1));
	}
}

rule Bootstrap16 {
	when {
		f : Fibonacci16 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate16 {
	when {
		f1 : Fibonacci16 f1.value != -1 {sequence : s1};
		f2 : Fibonacci16 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci16 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result16
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse17 {
	when {
		not(f : Fibonacci17 f.sequence == 1);
		f1 : Fibonacci17 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci17(f1.sequence - 1));
	}
}

rule Bootstrap17 {
	when {
		f : Fibonacci17 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate17 {
	when {
		f1 : Fibonacci17 f1.value != -1 {sequence : s1};
		f2 : Fibonacci17 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci17 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result17
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse18 {
	when {
		not(f : Fibonacci18 f.sequence == 1);
		f1 : Fibonacci18 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci18(f1.sequence - 1));
	}
}

rule Bootstrap18 {
	when {
		f : Fibonacci18 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate18 {
	when {
		f1 : Fibonacci18 f1.value != -1 {sequence : s1};
		f2 : Fibonacci18 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci18 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result18
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse19 {
	when {
		not(f : Fibonacci19 f.sequence == 1);
		f1 : Fibonacci19 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci19(f1.sequence - 1));
	}
}

rule Bootstrap19 {
	when {
		f : Fibonacci19 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate19 {
	when {
		f1 : Fibonacci19 f1.value != -1 {sequence : s1};
		f2 : Fibonacci19 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci19 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result19
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse20 {
	when {
		not(f : Fibonacci20 f.sequence == 1);
		f1 : Fibonacci20 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci20(f1.sequence - 1));
	}
}

rule Bootstrap20 {
	when {
		f : Fibonacci20 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate20 {
	when {
		f1 : Fibonacci20 f1.value != -1 {sequence : s1};
		f2 : Fibonacci20 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci20 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result20
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse21 {
	when {
		not(f : Fibonacci21 f.sequence == 1);
		f1 : Fibonacci21 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci21(f1.sequence - 1));
	}
}

rule Bootstrap21 {
	when {
		f : Fibonacci21 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate21 {
	when {
		f1 : Fibonacci21 f1.value != -1 {sequence : s1};
		f2 : Fibonacci21 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci21 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result21
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse22 {
	when {
		not(f : Fibonacci22 f.sequence == 1);
		f1 : Fibonacci22 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci22(f1.sequence - 1));
	}
}

rule Bootstrap22 {
	when {
		f : Fibonacci22 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate22 {
	when {
		f1 : Fibonacci22 f1.value != -1 {sequence : s1};
		f2 : Fibonacci22 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci22 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result22
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse23 {
	when {
		not(f : Fibonacci23 f.sequence == 1);
		f1 : Fibonacci23 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci23(f1.sequence - 1));
	}
}

rule Bootstrap23 {
	when {
		f : Fibonacci23 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate23 {
	when {
		f1 : Fibonacci23 f1.value != -1 {sequence : s1};
		f2 : Fibonacci23 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci23 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result23
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse24 {
	when {
		not(f : Fibonacci24 f.sequence == 1);
		f1 : Fibonacci24 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci24(f1.sequence - 1));
	}
}

rule Bootstrap24 {
	when {
		f : Fibonacci24 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate24 {
	when {
		f1 : Fibonacci24 f1.value != -1 {sequence : s1};
		f2 : Fibonacci24 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci24 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result24
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse25 {
	when {
		not(f : Fibonacci25 f.sequence == 1);
		f1 : Fibonacci25 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci25(f1.sequence - 1));
	}
}

rule Bootstrap25 {
	when {
		f : Fibonacci25 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate25 {
	when {
		f1 : Fibonacci25 f1.value != -1 {sequence : s1};
		f2 : Fibonacci25 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci25 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result25
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse26 {
	when {
		not(f : Fibonacci26 f.sequence == 1);
		f1 : Fibonacci26 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci26(f1.sequence - 1));
	}
}

rule Bootstrap26 {
	when {
		f : Fibonacci26 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate26 {
	when {
		f1 : Fibonacci26 f1.value != -1 {sequence : s1};
		f2 : Fibonacci26 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci26 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result26
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse27 {
	when {
		not(f : Fibonacci27 f.sequence == 1);
		f1 : Fibonacci27 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci27(f1.sequence - 1));
	}
}

rule Bootstrap27 {
	when {
		f : Fibonacci27 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate27 {
	when {
		f1 : Fibonacci27 f1.value != -1 {sequence : s1};
		f2 : Fibonacci27 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci27 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result27
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse28 {
	when {
		not(f : Fibonacci28 f.sequence == 1);
		f1 : Fibonacci28 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci28(f1.sequence - 1));
	}
}

rule Bootstrap28 {
	when {
		f : Fibonacci28 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate28 {
	when {
		f1 : Fibonacci28 f1.value != -1 {sequence : s1};
		f2 : Fibonacci28 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci28 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result28
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse29 {
	when {
		not(f : Fibonacci29 f.sequence == 1);
		f1 : Fibonacci29 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci29(f1.sequence - 1));
	}
}

rule Bootstrap29 {
	when {
		f : Fibonacci29 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate29 {
	when {
		f1 : Fibonacci29 f1.value != -1 {sequence : s1};
		f2 : Fibonacci29 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci29 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result29
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse30 {
	when {
		not(f : Fibonacci30 f.sequence == 1);
		f1 : Fibonacci30 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci30(f1.sequence - 1));
	}
}

rule Bootstrap30 {
	when {
		f : Fibonacci30 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate30 {
	when {
		f1 : Fibonacci30 f1.value != -1 {sequence : s1};
		f2 : Fibonacci30 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci30 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result30
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse31 {
	when {
		not(f : Fibonacci31 f.sequence == 1);
		f1 : Fibonacci31 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci31(f1.sequence - 1));
	}
}

rule Bootstrap31 {
	when {
		f : Fibonacci31 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate31 {
	when {
		f1 : Fibonacci31 f1.value != -1 {sequence : s1};
		f2 : Fibonacci31 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci31 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result31
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse32 {
	when {
		not(f : Fibonacci32 f.sequence == 1);
		f1 : Fibonacci32 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci32(f1.sequence - 1));
	}
}

rule Bootstrap32 {
	when {
		f : Fibonacci32 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate32 {
	when {
		f1 : Fibonacci32 f1.value != -1 {sequence : s1};
		f2 : Fibonacci32 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci32 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result32
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse33 {
	when {
		not(f : Fibonacci33 f.sequence == 1);
		f1 : Fibonacci33 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci33(f1.sequence - 1));
	}
}

rule Bootstrap33 {
	when {
		f : Fibonacci33 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate33 {
	when {
		f1 : Fibonacci33 f1.value != -1 {sequence : s1};
		f2 : Fibonacci33 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci33 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result33
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse34 {
	when {
		not(f : Fibonacci34 f.sequence == 1);
		f1 : Fibonacci34 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci34(f1.sequence - 1));
	}
}

rule Bootstrap34 {
	when {
		f : Fibonacci34 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate34 {
	when {
		f1 : Fibonacci34 f1.value != -1 {sequence : s1};
		f2 : Fibonacci34 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci34 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result34
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse35 {
	when {
		not(f : Fibonacci35 f.sequence == 1);
		f1 : Fibonacci35 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci35(f1.sequence - 1));
	}
}

rule Bootstrap35 {
	when {
		f : Fibonacci35 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate35 {
	when {
		f1 : Fibonacci35 f1.value != -1 {sequence : s1};
		f2 : Fibonacci35 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci35 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result35
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse36 {
	when {
		not(f : Fibonacci36 f.sequence == 1);
		f1 : Fibonacci36 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci36(f1.sequence - 1));
	}
}

rule Bootstrap36 {
	when {
		f : Fibonacci36 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate36 {
	when {
		f1 : Fibonacci36 f1.value != -1 {sequence : s1};
		f2 : Fibonacci36 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci36 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result36
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse37 {
	when {
		not(f : Fibonacci37 f.sequence == 1);
		f1 : Fibonacci37 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci37(f1.sequence - 1));
	}
}

rule Bootstrap37 {
	when {
		f : Fibonacci37 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate37 {
	when {
		f1 : Fibonacci37 f1.value != -1 {sequence : s1};
		f2 : Fibonacci37 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci37 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result37
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse38 {
	when {
		not(f : Fibonacci38 f.sequence == 1);
		f1 : Fibonacci38 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci38(f1.sequence - 1));
	}
}

rule Bootstrap38 {
	when {
		f : Fibonacci38 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate38 {
	when {
		f1 : Fibonacci38 f1.value != -1 {sequence : s1};
		f2 : Fibonacci38 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci38 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result38
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse39 {
	when {
		not(f : Fibonacci39 f.sequence == 1);
		f1 : Fibonacci39 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci39(f1.sequence - 1));
	}
}

rule Bootstrap39 {
	when {
		f : Fibonacci39 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate39 {
	when {
		f1 : Fibonacci39 f1.value != -1 {sequence : s1};
		f2 : Fibonacci39 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci39 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result39
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse40 {
	when {
		not(f : Fibonacci40 f.sequence == 1);
		f1 : Fibonacci40 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci40(f1.sequence - 1));
	}
}

rule Bootstrap40 {
	when {
		f : Fibonacci40 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate40 {
	when {
		f1 : Fibonacci40 f1.value != -1 {sequence : s1};
		f2 : Fibonacci40 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci40 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result40
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse41 {
	when {
		not(f : Fibonacci41 f.sequence == 1);
		f1 : Fibonacci41 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci41(f1.sequence - 1));
	}
}

rule Bootstrap41 {
	when {
		f : Fibonacci41 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate41 {
	when {
		f1 : Fibonacci41 f1.value != -1 {sequence : s1};
		f2 : Fibonacci41 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci41 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result41
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse42 {
	when {
		not(f : Fibonacci42 f.sequence == 1);
		f1 : Fibonacci42 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci42(f1.sequence - 1));
	}
}

rule Bootstrap42 {
	when {
		f : Fibonacci42 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate42 {
	when {
		f1 : Fibonacci42 f1.value != -1 {sequence : s1};
		f2 : Fibonacci42 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci42 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result42
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse43 {
	when {
		not(f : Fibonacci43 f.sequence == 1);
		f1 : Fibonacci43 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci43(f1.sequence - 1));
	}
}

rule Bootstrap43 {
	when {
		f : Fibonacci43 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate43 {
	when {
		f1 : Fibonacci43 f1.value != -1 {sequence : s1};
		f2 : Fibonacci43 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci43 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result43
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse44 {
	when {
		not(f : Fibonacci44 f.sequence == 1);
		f1 : Fibonacci44 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci44(f1.sequence - 1));
	}
}

rule Bootstrap44 {
	when {
		f : Fibonacci44 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate44 {
	when {
		f1 : Fibonacci44 f1.value != -1 {sequence : s1};
		f2 : Fibonacci44 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci44 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result44
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse45 {
	when {
		not(f : Fibonacci45 f.sequence == 1);
		f1 : Fibonacci45 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci45(f1.sequence - 1));
	}
}

rule Bootstrap45 {
	when {
		f : Fibonacci45 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate45 {
	when {
		f1 : Fibonacci45 f1.value != -1 {sequence : s1};
		f2 : Fibonacci45 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci45 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result45
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse46 {
	when {
		not(f : Fibonacci46 f.sequence == 1);
		f1 : Fibonacci46 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci46(f1.sequence - 1));
	}
}

rule Bootstrap46 {
	when {
		f : Fibonacci46 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate46 {
	when {
		f1 : Fibonacci46 f1.value != -1 {sequence : s1};
		f2 : Fibonacci46 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci46 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result46
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse47 {
	when {
		not(f : Fibonacci47 f.sequence == 1);
		f1 : Fibonacci47 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci47(f1.sequence - 1));
	}
}

rule Bootstrap47 {
	when {
		f : Fibonacci47 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate47 {
	when {
		f1 : Fibonacci47 f1.value != -1 {sequence : s1};
		f2 : Fibonacci47 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci47 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result47
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse48 {
	when {
		not(f : Fibonacci48 f.sequence == 1);
		f1 : Fibonacci48 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci48(f1.sequence - 1));
	}
}

rule Bootstrap48 {
	when {
		f : Fibonacci48 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate48 {
	when {
		f1 : Fibonacci48 f1.value != -1 {sequence : s1};
		f2 : Fibonacci48 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci48 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result48
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse49 {
	when {
		not(f : Fibonacci49 f.sequence == 1);
		f1 : Fibonacci49 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci49(f1.sequence - 1));
	}
}

rule Bootstrap49 {
	when {
		f : Fibonacci49 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate49 {
	when {
		f1 : Fibonacci49 f1.value != -1 {sequence : s1};
		f2 : Fibonacci49 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci49 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result49
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse50 {
	when {
		not(f : Fibonacci50 f.sequence == 1);
		f1 : Fibonacci50 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci50(f1.sequence - 1));
	}
}

rule Bootstrap50 {
	when {
		f : Fibonacci50 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate50 {
	when {
		f1 : Fibonacci50 f1.value != -1 {sequence : s1};
		f2 : Fibonacci50 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci50 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result50
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse51 {
	when {
		not(f : Fibonacci51 f.sequence == 1);
		f1 : Fibonacci51 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci51(f1.sequence - 1));
	}
}

rule Bootstrap51 {
	when {
		f : Fibonacci51 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate51 {
	when {
		f1 : Fibonacci51 f1.value != -1 {sequence : s1};
		f2 : Fibonacci51 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci51 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result51
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse52 {
	when {
		not(f : Fibonacci52 f.sequence == 1);
		f1 : Fibonacci52 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci52(f1.sequence - 1));
	}
}

rule Bootstrap52 {
	when {
		f : Fibonacci52 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate52 {
	when {
		f1 : Fibonacci52 f1.value != -1 {sequence : s1};
		f2 : Fibonacci52 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci52 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result52
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse53 {
	when {
		not(f : Fibonacci53 f.sequence == 1);
		f1 : Fibonacci53 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci53(f1.sequence - 1));
	}
}

rule Bootstrap53 {
	when {
		f : Fibonacci53 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate53 {
	when {
		f1 : Fibonacci53 f1.value != -1 {sequence : s1};
		f2 : Fibonacci53 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci53 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result53
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse54 {
	when {
		not(f : Fibonacci54 f.sequence == 1);
		f1 : Fibonacci54 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci54(f1.sequence - 1));
	}
}

rule Bootstrap54 {
	when {
		f : Fibonacci54 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate54 {
	when {
		f1 : Fibonacci54 f1.value != -1 {sequence : s1};
		f2 : Fibonacci54 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci54 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result54
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse55 {
	when {
		not(f : Fibonacci55 f.sequence == 1);
		f1 : Fibonacci55 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci55(f1.sequence - 1));
	}
}

rule Bootstrap55 {
	when {
		f : Fibonacci55 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate55 {
	when {
		f1 : Fibonacci55 f1.value != -1 {sequence : s1};
		f2 : Fibonacci55 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci55 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result55
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse56 {
	when {
		not(f : Fibonacci56 f.sequence == 1);
		f1 : Fibonacci56 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci56(f1.sequence - 1));
	}
}

rule Bootstrap56 {
	when {
		f : Fibonacci56 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate56 {
	when {
		f1 : Fibonacci56 f1.value != -1 {sequence : s1};
		f2 : Fibonacci56 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci56 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result56
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse57 {
	when {
		not(f : Fibonacci57 f.sequence == 1);
		f1 : Fibonacci57 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci57(f1.sequence - 1));
	}
}

rule Bootstrap57 {
	when {
		f : Fibonacci57 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate57 {
	when {
		f1 : Fibonacci57 f1.value != -1 {sequence : s1};
		f2 : Fibonacci57 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci57 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result57
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse58 {
	when {
		not(f : Fibonacci58 f.sequence == 1);
		f1 : Fibonacci58 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci58(f1.sequence - 1));
	}
}

rule Bootstrap58 {
	when {
		f : Fibonacci58 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate58 {
	when {
		f1 : Fibonacci58 f1.value != -1 {sequence : s1};
		f2 : Fibonacci58 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci58 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result58
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse59 {
	when {
		not(f : Fibonacci59 f.sequence == 1);
		f1 : Fibonacci59 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci59(f1.sequence - 1));
	}
}

rule Bootstrap59 {
	when {
		f : Fibonacci59 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate59 {
	when {
		f1 : Fibonacci59 f1.value != -1 {sequence : s1};
		f2 : Fibonacci59 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci59 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result59
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse60 {
	when {
		not(f : Fibonacci60 f.sequence == 1);
		f1 : Fibonacci60 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci60(f1.sequence - 1));
	}
}

rule Bootstrap60 {
	when {
		f : Fibonacci60 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate60 {
	when {
		f1 : Fibonacci60 f1.value != -1 {sequence : s1};
		f2 : Fibonacci60 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci60 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result60
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse61 {
	when {
		not(f : Fibonacci61 f.sequence == 1);
		f1 : Fibonacci61 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci61(f1.sequence - 1));
	}
}

rule Bootstrap61 {
	when {
		f : Fibonacci61 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate61 {
	when {
		f1 : Fibonacci61 f1.value != -1 {sequence : s1};
		f2 : Fibonacci61 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci61 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result61
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse62 {
	when {
		not(f : Fibonacci62 f.sequence == 1);
		f1 : Fibonacci62 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci62(f1.sequence - 1));
	}
}

rule Bootstrap62 {
	when {
		f : Fibonacci62 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate62 {
	when {
		f1 : Fibonacci62 f1.value != -1 {sequence : s1};
		f2 : Fibonacci62 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci62 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result62
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse63 {
	when {
		not(f : Fibonacci63 f.sequence == 1);
		f1 : Fibonacci63 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci63(f1.sequence - 1));
	}
}

rule Bootstrap63 {
	when {
		f : Fibonacci63 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate63 {
	when {
		f1 : Fibonacci63 f1.value != -1 {sequence : s1};
		f2 : Fibonacci63 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci63 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result63
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse64 {
	when {
		not(f : Fibonacci64 f.sequence == 1);
		f1 : Fibonacci64 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci64(f1.sequence - 1));
	}
}

rule Bootstrap64 {
	when {
		f : Fibonacci64 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate64 {
	when {
		f1 : Fibonacci64 f1.value != -1 {sequence : s1};
		f2 : Fibonacci64 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci64 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result64
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse65 {
	when {
		not(f : Fibonacci65 f.sequence == 1);
		f1 : Fibonacci65 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci65(f1.sequence - 1));
	}
}

rule Bootstrap65 {
	when {
		f : Fibonacci65 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate65 {
	when {
		f1 : Fibonacci65 f1.value != -1 {sequence : s1};
		f2 : Fibonacci65 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci65 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result65
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse66 {
	when {
		not(f : Fibonacci66 f.sequence == 1);
		f1 : Fibonacci66 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci66(f1.sequence - 1));
	}
}

rule Bootstrap66 {
	when {
		f : Fibonacci66 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate66 {
	when {
		f1 : Fibonacci66 f1.value != -1 {sequence : s1};
		f2 : Fibonacci66 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci66 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result66
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse67 {
	when {
		not(f : Fibonacci67 f.sequence == 1);
		f1 : Fibonacci67 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci67(f1.sequence - 1));
	}
}

rule Bootstrap67 {
	when {
		f : Fibonacci67 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate67 {
	when {
		f1 : Fibonacci67 f1.value != -1 {sequence : s1};
		f2 : Fibonacci67 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci67 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result67
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse68 {
	when {
		not(f : Fibonacci68 f.sequence == 1);
		f1 : Fibonacci68 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci68(f1.sequence - 1));
	}
}

rule Bootstrap68 {
	when {
		f : Fibonacci68 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate68 {
	when {
		f1 : Fibonacci68 f1.value != -1 {sequence : s1};
		f2 : Fibonacci68 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci68 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result68
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse69 {
	when {
		not(f : Fibonacci69 f.sequence == 1);
		f1 : Fibonacci69 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci69(f1.sequence - 1));
	}
}

rule Bootstrap69 {
	when {
		f : Fibonacci69 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate69 {
	when {
		f1 : Fibonacci69 f1.value != -1 {sequence : s1};
		f2 : Fibonacci69 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci69 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result69
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse70 {
	when {
		not(f : Fibonacci70 f.sequence == 1);
		f1 : Fibonacci70 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci70(f1.sequence - 1));
	}
}

rule Bootstrap70 {
	when {
		f : Fibonacci70 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate70 {
	when {
		f1 : Fibonacci70 f1.value != -1 {sequence : s1};
		f2 : Fibonacci70 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci70 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result70
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse71 {
	when {
		not(f : Fibonacci71 f.sequence == 1);
		f1 : Fibonacci71 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci71(f1.sequence - 1));
	}
}

rule Bootstrap71 {
	when {
		f : Fibonacci71 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate71 {
	when {
		f1 : Fibonacci71 f1.value != -1 {sequence : s1};
		f2 : Fibonacci71 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci71 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result71
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse72 {
	when {
		not(f : Fibonacci72 f.sequence == 1);
		f1 : Fibonacci72 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci72(f1.sequence - 1));
	}
}

rule Bootstrap72 {
	when {
		f : Fibonacci72 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate72 {
	when {
		f1 : Fibonacci72 f1.value != -1 {sequence : s1};
		f2 : Fibonacci72 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci72 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result72
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse73 {
	when {
		not(f : Fibonacci73 f.sequence == 1);
		f1 : Fibonacci73 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci73(f1.sequence - 1));
	}
}

rule Bootstrap73 {
	when {
		f : Fibonacci73 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate73 {
	when {
		f1 : Fibonacci73 f1.value != -1 {sequence : s1};
		f2 : Fibonacci73 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci73 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result73
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse74 {
	when {
		not(f : Fibonacci74 f.sequence == 1);
		f1 : Fibonacci74 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci74(f1.sequence - 1));
	}
}

rule Bootstrap74 {
	when {
		f : Fibonacci74 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate74 {
	when {
		f1 : Fibonacci74 f1.value != -1 {sequence : s1};
		f2 : Fibonacci74 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci74 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result74
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse75 {
	when {
		not(f : Fibonacci75 f.sequence == 1);
		f1 : Fibonacci75 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci75(f1.sequence - 1));
	}
}

rule Bootstrap75 {
	when {
		f : Fibonacci75 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate75 {
	when {
		f1 : Fibonacci75 f1.value != -1 {sequence : s1};
		f2 : Fibonacci75 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci75 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result75
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse76 {
	when {
		not(f : Fibonacci76 f.sequence == 1);
		f1 : Fibonacci76 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci76(f1.sequence - 1));
	}
}

rule Bootstrap76 {
	when {
		f : Fibonacci76 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate76 {
	when {
		f1 : Fibonacci76 f1.value != -1 {sequence : s1};
		f2 : Fibonacci76 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci76 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result76
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse77 {
	when {
		not(f : Fibonacci77 f.sequence == 1);
		f1 : Fibonacci77 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci77(f1.sequence - 1));
	}
}

rule Bootstrap77 {
	when {
		f : Fibonacci77 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate77 {
	when {
		f1 : Fibonacci77 f1.value != -1 {sequence : s1};
		f2 : Fibonacci77 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci77 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result77
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse78 {
	when {
		not(f : Fibonacci78 f.sequence == 1);
		f1 : Fibonacci78 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci78(f1.sequence - 1));
	}
}

rule Bootstrap78 {
	when {
		f : Fibonacci78 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate78 {
	when {
		f1 : Fibonacci78 f1.value != -1 {sequence : s1};
		f2 : Fibonacci78 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci78 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result78
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse79 {
	when {
		not(f : Fibonacci79 f.sequence == 1);
		f1 : Fibonacci79 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci79(f1.sequence - 1));
	}
}

rule Bootstrap79 {
	when {
		f : Fibonacci79 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate79 {
	when {
		f1 : Fibonacci79 f1.value != -1 {sequence : s1};
		f2 : Fibonacci79 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci79 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result79
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse80 {
	when {
		not(f : Fibonacci80 f.sequence == 1);
		f1 : Fibonacci80 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci80(f1.sequence - 1));
	}
}

rule Bootstrap80 {
	when {
		f : Fibonacci80 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate80 {
	when {
		f1 : Fibonacci80 f1.value != -1 {sequence : s1};
		f2 : Fibonacci80 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci80 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result80
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse81 {
	when {
		not(f : Fibonacci81 f.sequence == 1);
		f1 : Fibonacci81 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci81(f1.sequence - 1));
	}
}

rule Bootstrap81 {
	when {
		f : Fibonacci81 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate81 {
	when {
		f1 : Fibonacci81 f1.value != -1 {sequence : s1};
		f2 : Fibonacci81 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci81 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result81
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse82 {
	when {
		not(f : Fibonacci82 f.sequence == 1);
		f1 : Fibonacci82 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci82(f1.sequence - 1));
	}
}

rule Bootstrap82 {
	when {
		f : Fibonacci82 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate82 {
	when {
		f1 : Fibonacci82 f1.value != -1 {sequence : s1};
		f2 : Fibonacci82 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci82 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result82
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse83 {
	when {
		not(f : Fibonacci83 f.sequence == 1);
		f1 : Fibonacci83 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci83(f1.sequence - 1));
	}
}

rule Bootstrap83 {
	when {
		f : Fibonacci83 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate83 {
	when {
		f1 : Fibonacci83 f1.value != -1 {sequence : s1};
		f2 : Fibonacci83 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci83 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result83
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse84 {
	when {
		not(f : Fibonacci84 f.sequence == 1);
		f1 : Fibonacci84 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci84(f1.sequence - 1));
	}
}

rule Bootstrap84 {
	when {
		f : Fibonacci84 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate84 {
	when {
		f1 : Fibonacci84 f1.value != -1 {sequence : s1};
		f2 : Fibonacci84 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci84 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result84
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse85 {
	when {
		not(f : Fibonacci85 f.sequence == 1);
		f1 : Fibonacci85 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci85(f1.sequence - 1));
	}
}

rule Bootstrap85 {
	when {
		f : Fibonacci85 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate85 {
	when {
		f1 : Fibonacci85 f1.value != -1 {sequence : s1};
		f2 : Fibonacci85 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci85 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result85
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse86 {
	when {
		not(f : Fibonacci86 f.sequence == 1);
		f1 : Fibonacci86 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci86(f1.sequence - 1));
	}
}

rule Bootstrap86 {
	when {
		f : Fibonacci86 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate86 {
	when {
		f1 : Fibonacci86 f1.value != -1 {sequence : s1};
		f2 : Fibonacci86 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci86 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result86
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse87 {
	when {
		not(f : Fibonacci87 f.sequence == 1);
		f1 : Fibonacci87 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci87(f1.sequence - 1));
	}
}

rule Bootstrap87 {
	when {
		f : Fibonacci87 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate87 {
	when {
		f1 : Fibonacci87 f1.value != -1 {sequence : s1};
		f2 : Fibonacci87 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci87 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result87
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse88 {
	when {
		not(f : Fibonacci88 f.sequence == 1);
		f1 : Fibonacci88 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci88(f1.sequence - 1));
	}
}

rule Bootstrap88 {
	when {
		f : Fibonacci88 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate88 {
	when {
		f1 : Fibonacci88 f1.value != -1 {sequence : s1};
		f2 : Fibonacci88 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci88 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result88
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse89 {
	when {
		not(f : Fibonacci89 f.sequence == 1);
		f1 : Fibonacci89 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci89(f1.sequence - 1));
	}
}

rule Bootstrap89 {
	when {
		f : Fibonacci89 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate89 {
	when {
		f1 : Fibonacci89 f1.value != -1 {sequence : s1};
		f2 : Fibonacci89 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci89 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result89
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse90 {
	when {
		not(f : Fibonacci90 f.sequence == 1);
		f1 : Fibonacci90 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci90(f1.sequence - 1));
	}
}

rule Bootstrap90 {
	when {
		f : Fibonacci90 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate90 {
	when {
		f1 : Fibonacci90 f1.value != -1 {sequence : s1};
		f2 : Fibonacci90 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci90 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result90
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse91 {
	when {
		not(f : Fibonacci91 f.sequence == 1);
		f1 : Fibonacci91 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci91(f1.sequence - 1));
	}
}

rule Bootstrap91 {
	when {
		f : Fibonacci91 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate91 {
	when {
		f1 : Fibonacci91 f1.value != -1 {sequence : s1};
		f2 : Fibonacci91 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci91 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result91
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse92 {
	when {
		not(f : Fibonacci92 f.sequence == 1);
		f1 : Fibonacci92 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci92(f1.sequence - 1));
	}
}

rule Bootstrap92 {
	when {
		f : Fibonacci92 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate92 {
	when {
		f1 : Fibonacci92 f1.value != -1 {sequence : s1};
		f2 : Fibonacci92 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci92 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result92
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse93 {
	when {
		not(f : Fibonacci93 f.sequence == 1);
		f1 : Fibonacci93 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci93(f1.sequence - 1));
	}
}

rule Bootstrap93 {
	when {
		f : Fibonacci93 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate93 {
	when {
		f1 : Fibonacci93 f1.value != -1 {sequence : s1};
		f2 : Fibonacci93 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci93 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result93
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse94 {
	when {
		not(f : Fibonacci94 f.sequence == 1);
		f1 : Fibonacci94 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci94(f1.sequence - 1));
	}
}

rule Bootstrap94 {
	when {
		f : Fibonacci94 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate94 {
	when {
		f1 : Fibonacci94 f1.value != -1 {sequence : s1};
		f2 : Fibonacci94 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci94 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result94
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse95 {
	when {
		not(f : Fibonacci95 f.sequence == 1);
		f1 : Fibonacci95 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci95(f1.sequence - 1));
	}
}

rule Bootstrap95 {
	when {
		f : Fibonacci95 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate95 {
	when {
		f1 : Fibonacci95 f1.value != -1 {sequence : s1};
		f2 : Fibonacci95 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci95 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result95
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse96 {
	when {
		not(f : Fibonacci96 f.sequence == 1);
		f1 : Fibonacci96 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci96(f1.sequence - 1));
	}
}

rule Bootstrap96 {
	when {
		f : Fibonacci96 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate96 {
	when {
		f1 : Fibonacci96 f1.value != -1 {sequence : s1};
		f2 : Fibonacci96 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci96 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result96
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse97 {
	when {
		not(f : Fibonacci97 f.sequence == 1);
		f1 : Fibonacci97 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci97(f1.sequence - 1));
	}
}

rule Bootstrap97 {
	when {
		f : Fibonacci97 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate97 {
	when {
		f1 : Fibonacci97 f1.value != -1 {sequence : s1};
		f2 : Fibonacci97 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci97 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result97
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse98 {
	when {
		not(f : Fibonacci98 f.sequence == 1);
		f1 : Fibonacci98 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci98(f1.sequence - 1));
	}
}

rule Bootstrap98 {
	when {
		f : Fibonacci98 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate98 {
	when {
		f1 : Fibonacci98 f1.value != -1 {sequence : s1};
		f2 : Fibonacci98 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci98 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result98
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse99 {
	when {
		not(f : Fibonacci99 f.sequence == 1);
		f1 : Fibonacci99 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci99(f1.sequence - 1));
	}
}

rule Bootstrap99 {
	when {
		f : Fibonacci99 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate99 {
	when {
		f1 : Fibonacci99 f1.value != -1 {sequence : s1};
		f2 : Fibonacci99 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci99 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result99
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse100 {
	when {
		not(f : Fibonacci100 f.sequence == 1);
		f1 : Fibonacci100 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci100(f1.sequence - 1));
	}
}

rule Bootstrap100 {
	when {
		f : Fibonacci100 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate100 {
	when {
		f1 : Fibonacci100 f1.value != -1 {sequence : s1};
		f2 : Fibonacci100 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci100 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result100
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse101 {
	when {
		not(f : Fibonacci101 f.sequence == 1);
		f1 : Fibonacci101 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci101(f1.sequence - 1));
	}
}

rule Bootstrap101 {
	when {
		f : Fibonacci101 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate101 {
	when {
		f1 : Fibonacci101 f1.value != -1 {sequence : s1};
		f2 : Fibonacci101 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci101 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result101
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse102 {
	when {
		not(f : Fibonacci102 f.sequence == 1);
		f1 : Fibonacci102 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci102(f1.sequence - 1));
	}
}

rule Bootstrap102 {
	when {
		f : Fibonacci102 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate102 {
	when {
		f1 : Fibonacci102 f1.value != -1 {sequence : s1};
		f2 : Fibonacci102 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci102 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result102
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse103 {
	when {
		not(f : Fibonacci103 f.sequence == 1);
		f1 : Fibonacci103 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci103(f1.sequence - 1));
	}
}

rule Bootstrap103 {
	when {
		f : Fibonacci103 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate103 {
	when {
		f1 : Fibonacci103 f1.value != -1 {sequence : s1};
		f2 : Fibonacci103 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci103 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result103
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse104 {
	when {
		not(f : Fibonacci104 f.sequence == 1);
		f1 : Fibonacci104 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci104(f1.sequence - 1));
	}
}

rule Bootstrap104 {
	when {
		f : Fibonacci104 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate104 {
	when {
		f1 : Fibonacci104 f1.value != -1 {sequence : s1};
		f2 : Fibonacci104 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci104 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result104
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse105 {
	when {
		not(f : Fibonacci105 f.sequence == 1);
		f1 : Fibonacci105 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci105(f1.sequence - 1));
	}
}

rule Bootstrap105 {
	when {
		f : Fibonacci105 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate105 {
	when {
		f1 : Fibonacci105 f1.value != -1 {sequence : s1};
		f2 : Fibonacci105 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci105 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result105
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse106 {
	when {
		not(f : Fibonacci106 f.sequence == 1);
		f1 : Fibonacci106 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci106(f1.sequence - 1));
	}
}

rule Bootstrap106 {
	when {
		f : Fibonacci106 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate106 {
	when {
		f1 : Fibonacci106 f1.value != -1 {sequence : s1};
		f2 : Fibonacci106 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci106 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result106
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse107 {
	when {
		not(f : Fibonacci107 f.sequence == 1);
		f1 : Fibonacci107 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci107(f1.sequence - 1));
	}
}

rule Bootstrap107 {
	when {
		f : Fibonacci107 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate107 {
	when {
		f1 : Fibonacci107 f1.value != -1 {sequence : s1};
		f2 : Fibonacci107 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci107 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result107
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse108 {
	when {
		not(f : Fibonacci108 f.sequence == 1);
		f1 : Fibonacci108 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci108(f1.sequence - 1));
	}
}

rule Bootstrap108 {
	when {
		f : Fibonacci108 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate108 {
	when {
		f1 : Fibonacci108 f1.value != -1 {sequence : s1};
		f2 : Fibonacci108 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci108 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result108
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse109 {
	when {
		not(f : Fibonacci109 f.sequence == 1);
		f1 : Fibonacci109 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci109(f1.sequence - 1));
	}
}

rule Bootstrap109 {
	when {
		f : Fibonacci109 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate109 {
	when {
		f1 : Fibonacci109 f1.value != -1 {sequence : s1};
		f2 : Fibonacci109 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci109 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result109
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse110 {
	when {
		not(f : Fibonacci110 f.sequence == 1);
		f1 : Fibonacci110 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci110(f1.sequence - 1));
	}
}

rule Bootstrap110 {
	when {
		f : Fibonacci110 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate110 {
	when {
		f1 : Fibonacci110 f1.value != -1 {sequence : s1};
		f2 : Fibonacci110 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci110 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result110
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse111 {
	when {
		not(f : Fibonacci111 f.sequence == 1);
		f1 : Fibonacci111 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci111(f1.sequence - 1));
	}
}

rule Bootstrap111 {
	when {
		f : Fibonacci111 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate111 {
	when {
		f1 : Fibonacci111 f1.value != -1 {sequence : s1};
		f2 : Fibonacci111 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci111 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result111
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse112 {
	when {
		not(f : Fibonacci112 f.sequence == 1);
		f1 : Fibonacci112 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci112(f1.sequence - 1));
	}
}

rule Bootstrap112 {
	when {
		f : Fibonacci112 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate112 {
	when {
		f1 : Fibonacci112 f1.value != -1 {sequence : s1};
		f2 : Fibonacci112 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci112 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result112
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse113 {
	when {
		not(f : Fibonacci113 f.sequence == 1);
		f1 : Fibonacci113 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci113(f1.sequence - 1));
	}
}

rule Bootstrap113 {
	when {
		f : Fibonacci113 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate113 {
	when {
		f1 : Fibonacci113 f1.value != -1 {sequence : s1};
		f2 : Fibonacci113 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci113 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result113
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse114 {
	when {
		not(f : Fibonacci114 f.sequence == 1);
		f1 : Fibonacci114 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci114(f1.sequence - 1));
	}
}

rule Bootstrap114 {
	when {
		f : Fibonacci114 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate114 {
	when {
		f1 : Fibonacci114 f1.value != -1 {sequence : s1};
		f2 : Fibonacci114 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci114 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result114
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse115 {
	when {
		not(f : Fibonacci115 f.sequence == 1);
		f1 : Fibonacci115 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci115(f1.sequence - 1));
	}
}

rule Bootstrap115 {
	when {
		f : Fibonacci115 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate115 {
	when {
		f1 : Fibonacci115 f1.value != -1 {sequence : s1};
		f2 : Fibonacci115 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci115 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result115
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse116 {
	when {
		not(f : Fibonacci116 f.sequence == 1);
		f1 : Fibonacci116 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci116(f1.sequence - 1));
	}
}

rule Bootstrap116 {
	when {
		f : Fibonacci116 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate116 {
	when {
		f1 : Fibonacci116 f1.value != -1 {sequence : s1};
		f2 : Fibonacci116 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci116 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result116
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse117 {
	when {
		not(f : Fibonacci117 f.sequence == 1);
		f1 : Fibonacci117 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci117(f1.sequence - 1));
	}
}

rule Bootstrap117 {
	when {
		f : Fibonacci117 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate117 {
	when {
		f1 : Fibonacci117 f1.value != -1 {sequence : s1};
		f2 : Fibonacci117 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci117 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result117
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse118 {
	when {
		not(f : Fibonacci118 f.sequence == 1);
		f1 : Fibonacci118 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci118(f1.sequence - 1));
	}
}

rule Bootstrap118 {
	when {
		f : Fibonacci118 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate118 {
	when {
		f1 : Fibonacci118 f1.value != -1 {sequence : s1};
		f2 : Fibonacci118 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci118 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result118
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse119 {
	when {
		not(f : Fibonacci119 f.sequence == 1);
		f1 : Fibonacci119 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci119(f1.sequence - 1));
	}
}

rule Bootstrap119 {
	when {
		f : Fibonacci119 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate119 {
	when {
		f1 : Fibonacci119 f1.value != -1 {sequence : s1};
		f2 : Fibonacci119 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci119 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result119
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse120 {
	when {
		not(f : Fibonacci120 f.sequence == 1);
		f1 : Fibonacci120 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci120(f1.sequence - 1));
	}
}

rule Bootstrap120 {
	when {
		f : Fibonacci120 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate120 {
	when {
		f1 : Fibonacci120 f1.value != -1 {sequence : s1};
		f2 : Fibonacci120 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci120 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result120
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse121 {
	when {
		not(f : Fibonacci121 f.sequence == 1);
		f1 : Fibonacci121 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci121(f1.sequence - 1));
	}
}

rule Bootstrap121 {
	when {
		f : Fibonacci121 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate121 {
	when {
		f1 : Fibonacci121 f1.value != -1 {sequence : s1};
		f2 : Fibonacci121 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci121 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result121
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse122 {
	when {
		not(f : Fibonacci122 f.sequence == 1);
		f1 : Fibonacci122 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci122(f1.sequence - 1));
	}
}

rule Bootstrap122 {
	when {
		f : Fibonacci122 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate122 {
	when {
		f1 : Fibonacci122 f1.value != -1 {sequence : s1};
		f2 : Fibonacci122 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci122 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result122
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse123 {
	when {
		not(f : Fibonacci123 f.sequence == 1);
		f1 : Fibonacci123 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci123(f1.sequence - 1));
	}
}

rule Bootstrap123 {
	when {
		f : Fibonacci123 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate123 {
	when {
		f1 : Fibonacci123 f1.value != -1 {sequence : s1};
		f2 : Fibonacci123 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci123 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result123
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse124 {
	when {
		not(f : Fibonacci124 f.sequence == 1);
		f1 : Fibonacci124 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci124(f1.sequence - 1));
	}
}

rule Bootstrap124 {
	when {
		f : Fibonacci124 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate124 {
	when {
		f1 : Fibonacci124 f1.value != -1 {sequence : s1};
		f2 : Fibonacci124 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci124 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result124
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse125 {
	when {
		not(f : Fibonacci125 f.sequence == 1);
		f1 : Fibonacci125 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci125(f1.sequence - 1));
	}
}

rule Bootstrap125 {
	when {
		f : Fibonacci125 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate125 {
	when {
		f1 : Fibonacci125 f1.value != -1 {sequence : s1};
		f2 : Fibonacci125 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci125 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result125
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse126 {
	when {
		not(f : Fibonacci126 f.sequence == 1);
		f1 : Fibonacci126 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci126(f1.sequence - 1));
	}
}

rule Bootstrap126 {
	when {
		f : Fibonacci126 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate126 {
	when {
		f1 : Fibonacci126 f1.value != -1 {sequence : s1};
		f2 : Fibonacci126 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci126 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result126
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse127 {
	when {
		not(f : Fibonacci127 f.sequence == 1);
		f1 : Fibonacci127 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci127(f1.sequence - 1));
	}
}

rule Bootstrap127 {
	when {
		f : Fibonacci127 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate127 {
	when {
		f1 : Fibonacci127 f1.value != -1 {sequence : s1};
		f2 : Fibonacci127 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci127 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result127
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse128 {
	when {
		not(f : Fibonacci128 f.sequence == 1);
		f1 : Fibonacci128 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci128(f1.sequence - 1));
	}
}

rule Bootstrap128 {
	when {
		f : Fibonacci128 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate128 {
	when {
		f1 : Fibonacci128 f1.value != -1 {sequence : s1};
		f2 : Fibonacci128 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci128 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result128
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse129 {
	when {
		not(f : Fibonacci129 f.sequence == 1);
		f1 : Fibonacci129 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci129(f1.sequence - 1));
	}
}

rule Bootstrap129 {
	when {
		f : Fibonacci129 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate129 {
	when {
		f1 : Fibonacci129 f1.value != -1 {sequence : s1};
		f2 : Fibonacci129 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci129 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result129
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse130 {
	when {
		not(f : Fibonacci130 f.sequence == 1);
		f1 : Fibonacci130 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci130(f1.sequence - 1));
	}
}

rule Bootstrap130 {
	when {
		f : Fibonacci130 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate130 {
	when {
		f1 : Fibonacci130 f1.value != -1 {sequence : s1};
		f2 : Fibonacci130 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci130 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result130
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse131 {
	when {
		not(f : Fibonacci131 f.sequence == 1);
		f1 : Fibonacci131 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci131(f1.sequence - 1));
	}
}

rule Bootstrap131 {
	when {
		f : Fibonacci131 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate131 {
	when {
		f1 : Fibonacci131 f1.value != -1 {sequence : s1};
		f2 : Fibonacci131 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci131 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result131
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse132 {
	when {
		not(f : Fibonacci132 f.sequence == 1);
		f1 : Fibonacci132 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci132(f1.sequence - 1));
	}
}

rule Bootstrap132 {
	when {
		f : Fibonacci132 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate132 {
	when {
		f1 : Fibonacci132 f1.value != -1 {sequence : s1};
		f2 : Fibonacci132 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci132 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result132
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse133 {
	when {
		not(f : Fibonacci133 f.sequence == 1);
		f1 : Fibonacci133 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci133(f1.sequence - 1));
	}
}

rule Bootstrap133 {
	when {
		f : Fibonacci133 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate133 {
	when {
		f1 : Fibonacci133 f1.value != -1 {sequence : s1};
		f2 : Fibonacci133 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci133 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result133
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse134 {
	when {
		not(f : Fibonacci134 f.sequence == 1);
		f1 : Fibonacci134 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci134(f1.sequence - 1));
	}
}

rule Bootstrap134 {
	when {
		f : Fibonacci134 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate134 {
	when {
		f1 : Fibonacci134 f1.value != -1 {sequence : s1};
		f2 : Fibonacci134 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci134 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result134
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse135 {
	when {
		not(f : Fibonacci135 f.sequence == 1);
		f1 : Fibonacci135 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci135(f1.sequence - 1));
	}
}

rule Bootstrap135 {
	when {
		f : Fibonacci135 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate135 {
	when {
		f1 : Fibonacci135 f1.value != -1 {sequence : s1};
		f2 : Fibonacci135 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci135 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result135
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse136 {
	when {
		not(f : Fibonacci136 f.sequence == 1);
		f1 : Fibonacci136 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci136(f1.sequence - 1));
	}
}

rule Bootstrap136 {
	when {
		f : Fibonacci136 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate136 {
	when {
		f1 : Fibonacci136 f1.value != -1 {sequence : s1};
		f2 : Fibonacci136 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci136 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result136
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse137 {
	when {
		not(f : Fibonacci137 f.sequence == 1);
		f1 : Fibonacci137 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci137(f1.sequence - 1));
	}
}

rule Bootstrap137 {
	when {
		f : Fibonacci137 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate137 {
	when {
		f1 : Fibonacci137 f1.value != -1 {sequence : s1};
		f2 : Fibonacci137 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci137 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result137
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse138 {
	when {
		not(f : Fibonacci138 f.sequence == 1);
		f1 : Fibonacci138 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci138(f1.sequence - 1));
	}
}

rule Bootstrap138 {
	when {
		f : Fibonacci138 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate138 {
	when {
		f1 : Fibonacci138 f1.value != -1 {sequence : s1};
		f2 : Fibonacci138 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci138 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result138
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse139 {
	when {
		not(f : Fibonacci139 f.sequence == 1);
		f1 : Fibonacci139 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci139(f1.sequence - 1));
	}
}

rule Bootstrap139 {
	when {
		f : Fibonacci139 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate139 {
	when {
		f1 : Fibonacci139 f1.value != -1 {sequence : s1};
		f2 : Fibonacci139 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci139 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result139
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse140 {
	when {
		not(f : Fibonacci140 f.sequence == 1);
		f1 : Fibonacci140 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci140(f1.sequence - 1));
	}
}

rule Bootstrap140 {
	when {
		f : Fibonacci140 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate140 {
	when {
		f1 : Fibonacci140 f1.value != -1 {sequence : s1};
		f2 : Fibonacci140 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci140 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result140
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse141 {
	when {
		not(f : Fibonacci141 f.sequence == 1);
		f1 : Fibonacci141 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci141(f1.sequence - 1));
	}
}

rule Bootstrap141 {
	when {
		f : Fibonacci141 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate141 {
	when {
		f1 : Fibonacci141 f1.value != -1 {sequence : s1};
		f2 : Fibonacci141 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci141 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result141
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse142 {
	when {
		not(f : Fibonacci142 f.sequence == 1);
		f1 : Fibonacci142 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci142(f1.sequence - 1));
	}
}

rule Bootstrap142 {
	when {
		f : Fibonacci142 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate142 {
	when {
		f1 : Fibonacci142 f1.value != -1 {sequence : s1};
		f2 : Fibonacci142 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci142 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result142
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse143 {
	when {
		not(f : Fibonacci143 f.sequence == 1);
		f1 : Fibonacci143 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci143(f1.sequence - 1));
	}
}

rule Bootstrap143 {
	when {
		f : Fibonacci143 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate143 {
	when {
		f1 : Fibonacci143 f1.value != -1 {sequence : s1};
		f2 : Fibonacci143 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci143 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result143
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse144 {
	when {
		not(f : Fibonacci144 f.sequence == 1);
		f1 : Fibonacci144 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci144(f1.sequence - 1));
	}
}

rule Bootstrap144 {
	when {
		f : Fibonacci144 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate144 {
	when {
		f1 : Fibonacci144 f1.value != -1 {sequence : s1};
		f2 : Fibonacci144 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci144 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result144
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse145 {
	when {
		not(f : Fibonacci145 f.sequence == 1);
		f1 : Fibonacci145 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci145(f1.sequence - 1));
	}
}

rule Bootstrap145 {
	when {
		f : Fibonacci145 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate145 {
	when {
		f1 : Fibonacci145 f1.value != -1 {sequence : s1};
		f2 : Fibonacci145 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci145 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result145
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse146 {
	when {
		not(f : Fibonacci146 f.sequence == 1);
		f1 : Fibonacci146 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci146(f1.sequence - 1));
	}
}

rule Bootstrap146 {
	when {
		f : Fibonacci146 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate146 {
	when {
		f1 : Fibonacci146 f1.value != -1 {sequence : s1};
		f2 : Fibonacci146 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci146 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result146
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse147 {
	when {
		not(f : Fibonacci147 f.sequence == 1);
		f1 : Fibonacci147 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci147(f1.sequence - 1));
	}
}

rule Bootstrap147 {
	when {
		f : Fibonacci147 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate147 {
	when {
		f1 : Fibonacci147 f1.value != -1 {sequence : s1};
		f2 : Fibonacci147 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci147 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result147
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse148 {
	when {
		not(f : Fibonacci148 f.sequence == 1);
		f1 : Fibonacci148 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci148(f1.sequence - 1));
	}
}

rule Bootstrap148 {
	when {
		f : Fibonacci148 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate148 {
	when {
		f1 : Fibonacci148 f1.value != -1 {sequence : s1};
		f2 : Fibonacci148 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci148 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result148
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse149 {
	when {
		not(f : Fibonacci149 f.sequence == 1);
		f1 : Fibonacci149 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci149(f1.sequence - 1));
	}
}

rule Bootstrap149 {
	when {
		f : Fibonacci149 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate149 {
	when {
		f1 : Fibonacci149 f1.value != -1 {sequence : s1};
		f2 : Fibonacci149 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci149 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result149
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse150 {
	when {
		not(f : Fibonacci150 f.sequence == 1);
		f1 : Fibonacci150 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci150(f1.sequence - 1));
	}
}

rule Bootstrap150 {
	when {
		f : Fibonacci150 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate150 {
	when {
		f1 : Fibonacci150 f1.value != -1 {sequence : s1};
		f2 : Fibonacci150 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci150 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result150
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse151 {
	when {
		not(f : Fibonacci151 f.sequence == 1);
		f1 : Fibonacci151 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci151(f1.sequence - 1));
	}
}

rule Bootstrap151 {
	when {
		f : Fibonacci151 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate151 {
	when {
		f1 : Fibonacci151 f1.value != -1 {sequence : s1};
		f2 : Fibonacci151 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci151 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result151
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse152 {
	when {
		not(f : Fibonacci152 f.sequence == 1);
		f1 : Fibonacci152 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci152(f1.sequence - 1));
	}
}

rule Bootstrap152 {
	when {
		f : Fibonacci152 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate152 {
	when {
		f1 : Fibonacci152 f1.value != -1 {sequence : s1};
		f2 : Fibonacci152 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci152 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result152
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse153 {
	when {
		not(f : Fibonacci153 f.sequence == 1);
		f1 : Fibonacci153 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci153(f1.sequence - 1));
	}
}

rule Bootstrap153 {
	when {
		f : Fibonacci153 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate153 {
	when {
		f1 : Fibonacci153 f1.value != -1 {sequence : s1};
		f2 : Fibonacci153 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci153 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result153
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse154 {
	when {
		not(f : Fibonacci154 f.sequence == 1);
		f1 : Fibonacci154 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci154(f1.sequence - 1));
	}
}

rule Bootstrap154 {
	when {
		f : Fibonacci154 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate154 {
	when {
		f1 : Fibonacci154 f1.value != -1 {sequence : s1};
		f2 : Fibonacci154 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci154 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result154
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse155 {
	when {
		not(f : Fibonacci155 f.sequence == 1);
		f1 : Fibonacci155 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci155(f1.sequence - 1));
	}
}

rule Bootstrap155 {
	when {
		f : Fibonacci155 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate155 {
	when {
		f1 : Fibonacci155 f1.value != -1 {sequence : s1};
		f2 : Fibonacci155 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci155 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result155
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse156 {
	when {
		not(f : Fibonacci156 f.sequence == 1);
		f1 : Fibonacci156 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci156(f1.sequence - 1));
	}
}

rule Bootstrap156 {
	when {
		f : Fibonacci156 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate156 {
	when {
		f1 : Fibonacci156 f1.value != -1 {sequence : s1};
		f2 : Fibonacci156 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci156 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result156
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse157 {
	when {
		not(f : Fibonacci157 f.sequence == 1);
		f1 : Fibonacci157 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci157(f1.sequence - 1));
	}
}

rule Bootstrap157 {
	when {
		f : Fibonacci157 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate157 {
	when {
		f1 : Fibonacci157 f1.value != -1 {sequence : s1};
		f2 : Fibonacci157 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci157 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result157
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse158 {
	when {
		not(f : Fibonacci158 f.sequence == 1);
		f1 : Fibonacci158 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci158(f1.sequence - 1));
	}
}

rule Bootstrap158 {
	when {
		f : Fibonacci158 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate158 {
	when {
		f1 : Fibonacci158 f1.value != -1 {sequence : s1};
		f2 : Fibonacci158 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci158 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result158
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse159 {
	when {
		not(f : Fibonacci159 f.sequence == 1);
		f1 : Fibonacci159 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci159(f1.sequence - 1));
	}
}

rule Bootstrap159 {
	when {
		f : Fibonacci159 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate159 {
	when {
		f1 : Fibonacci159 f1.value != -1 {sequence : s1};
		f2 : Fibonacci159 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci159 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result159
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse160 {
	when {
		not(f : Fibonacci160 f.sequence == 1);
		f1 : Fibonacci160 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci160(f1.sequence - 1));
	}
}

rule Bootstrap160 {
	when {
		f : Fibonacci160 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate160 {
	when {
		f1 : Fibonacci160 f1.value != -1 {sequence : s1};
		f2 : Fibonacci160 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci160 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result160
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse161 {
	when {
		not(f : Fibonacci161 f.sequence == 1);
		f1 : Fibonacci161 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci161(f1.sequence - 1));
	}
}

rule Bootstrap161 {
	when {
		f : Fibonacci161 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate161 {
	when {
		f1 : Fibonacci161 f1.value != -1 {sequence : s1};
		f2 : Fibonacci161 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci161 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result161
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse162 {
	when {
		not(f : Fibonacci162 f.sequence == 1);
		f1 : Fibonacci162 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci162(f1.sequence - 1));
	}
}

rule Bootstrap162 {
	when {
		f : Fibonacci162 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate162 {
	when {
		f1 : Fibonacci162 f1.value != -1 {sequence : s1};
		f2 : Fibonacci162 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci162 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result162
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse163 {
	when {
		not(f : Fibonacci163 f.sequence == 1);
		f1 : Fibonacci163 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci163(f1.sequence - 1));
	}
}

rule Bootstrap163 {
	when {
		f : Fibonacci163 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate163 {
	when {
		f1 : Fibonacci163 f1.value != -1 {sequence : s1};
		f2 : Fibonacci163 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci163 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result163
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse164 {
	when {
		not(f : Fibonacci164 f.sequence == 1);
		f1 : Fibonacci164 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci164(f1.sequence - 1));
	}
}

rule Bootstrap164 {
	when {
		f : Fibonacci164 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate164 {
	when {
		f1 : Fibonacci164 f1.value != -1 {sequence : s1};
		f2 : Fibonacci164 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci164 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result164
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse165 {
	when {
		not(f : Fibonacci165 f.sequence == 1);
		f1 : Fibonacci165 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci165(f1.sequence - 1));
	}
}

rule Bootstrap165 {
	when {
		f : Fibonacci165 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate165 {
	when {
		f1 : Fibonacci165 f1.value != -1 {sequence : s1};
		f2 : Fibonacci165 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci165 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result165
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse166 {
	when {
		not(f : Fibonacci166 f.sequence == 1);
		f1 : Fibonacci166 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci166(f1.sequence - 1));
	}
}

rule Bootstrap166 {
	when {
		f : Fibonacci166 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate166 {
	when {
		f1 : Fibonacci166 f1.value != -1 {sequence : s1};
		f2 : Fibonacci166 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci166 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result166
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse167 {
	when {
		not(f : Fibonacci167 f.sequence == 1);
		f1 : Fibonacci167 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci167(f1.sequence - 1));
	}
}

rule Bootstrap167 {
	when {
		f : Fibonacci167 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate167 {
	when {
		f1 : Fibonacci167 f1.value != -1 {sequence : s1};
		f2 : Fibonacci167 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci167 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result167
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse168 {
	when {
		not(f : Fibonacci168 f.sequence == 1);
		f1 : Fibonacci168 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci168(f1.sequence - 1));
	}
}

rule Bootstrap168 {
	when {
		f : Fibonacci168 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate168 {
	when {
		f1 : Fibonacci168 f1.value != -1 {sequence : s1};
		f2 : Fibonacci168 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci168 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result168
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse169 {
	when {
		not(f : Fibonacci169 f.sequence == 1);
		f1 : Fibonacci169 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci169(f1.sequence - 1));
	}
}

rule Bootstrap169 {
	when {
		f : Fibonacci169 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate169 {
	when {
		f1 : Fibonacci169 f1.value != -1 {sequence : s1};
		f2 : Fibonacci169 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci169 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result169
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse170 {
	when {
		not(f : Fibonacci170 f.sequence == 1);
		f1 : Fibonacci170 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci170(f1.sequence - 1));
	}
}

rule Bootstrap170 {
	when {
		f : Fibonacci170 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate170 {
	when {
		f1 : Fibonacci170 f1.value != -1 {sequence : s1};
		f2 : Fibonacci170 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci170 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result170
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse171 {
	when {
		not(f : Fibonacci171 f.sequence == 1);
		f1 : Fibonacci171 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci171(f1.sequence - 1));
	}
}

rule Bootstrap171 {
	when {
		f : Fibonacci171 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate171 {
	when {
		f1 : Fibonacci171 f1.value != -1 {sequence : s1};
		f2 : Fibonacci171 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci171 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result171
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse172 {
	when {
		not(f : Fibonacci172 f.sequence == 1);
		f1 : Fibonacci172 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci172(f1.sequence - 1));
	}
}

rule Bootstrap172 {
	when {
		f : Fibonacci172 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate172 {
	when {
		f1 : Fibonacci172 f1.value != -1 {sequence : s1};
		f2 : Fibonacci172 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci172 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result172
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse173 {
	when {
		not(f : Fibonacci173 f.sequence == 1);
		f1 : Fibonacci173 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci173(f1.sequence - 1));
	}
}

rule Bootstrap173 {
	when {
		f : Fibonacci173 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate173 {
	when {
		f1 : Fibonacci173 f1.value != -1 {sequence : s1};
		f2 : Fibonacci173 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci173 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result173
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse174 {
	when {
		not(f : Fibonacci174 f.sequence == 1);
		f1 : Fibonacci174 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci174(f1.sequence - 1));
	}
}

rule Bootstrap174 {
	when {
		f : Fibonacci174 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate174 {
	when {
		f1 : Fibonacci174 f1.value != -1 {sequence : s1};
		f2 : Fibonacci174 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci174 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result174
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse175 {
	when {
		not(f : Fibonacci175 f.sequence == 1);
		f1 : Fibonacci175 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci175(f1.sequence - 1));
	}
}

rule Bootstrap175 {
	when {
		f : Fibonacci175 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate175 {
	when {
		f1 : Fibonacci175 f1.value != -1 {sequence : s1};
		f2 : Fibonacci175 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci175 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result175
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse176 {
	when {
		not(f : Fibonacci176 f.sequence == 1);
		f1 : Fibonacci176 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci176(f1.sequence - 1));
	}
}

rule Bootstrap176 {
	when {
		f : Fibonacci176 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate176 {
	when {
		f1 : Fibonacci176 f1.value != -1 {sequence : s1};
		f2 : Fibonacci176 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci176 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result176
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse177 {
	when {
		not(f : Fibonacci177 f.sequence == 1);
		f1 : Fibonacci177 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci177(f1.sequence - 1));
	}
}

rule Bootstrap177 {
	when {
		f : Fibonacci177 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate177 {
	when {
		f1 : Fibonacci177 f1.value != -1 {sequence : s1};
		f2 : Fibonacci177 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci177 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result177
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse178 {
	when {
		not(f : Fibonacci178 f.sequence == 1);
		f1 : Fibonacci178 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci178(f1.sequence - 1));
	}
}

rule Bootstrap178 {
	when {
		f : Fibonacci178 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate178 {
	when {
		f1 : Fibonacci178 f1.value != -1 {sequence : s1};
		f2 : Fibonacci178 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci178 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result178
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse179 {
	when {
		not(f : Fibonacci179 f.sequence == 1);
		f1 : Fibonacci179 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci179(f1.sequence - 1));
	}
}

rule Bootstrap179 {
	when {
		f : Fibonacci179 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate179 {
	when {
		f1 : Fibonacci179 f1.value != -1 {sequence : s1};
		f2 : Fibonacci179 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci179 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result179
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse180 {
	when {
		not(f : Fibonacci180 f.sequence == 1);
		f1 : Fibonacci180 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci180(f1.sequence - 1));
	}
}

rule Bootstrap180 {
	when {
		f : Fibonacci180 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate180 {
	when {
		f1 : Fibonacci180 f1.value != -1 {sequence : s1};
		f2 : Fibonacci180 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci180 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result180
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse181 {
	when {
		not(f : Fibonacci181 f.sequence == 1);
		f1 : Fibonacci181 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci181(f1.sequence - 1));
	}
}

rule Bootstrap181 {
	when {
		f : Fibonacci181 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate181 {
	when {
		f1 : Fibonacci181 f1.value != -1 {sequence : s1};
		f2 : Fibonacci181 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci181 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result181
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse182 {
	when {
		not(f : Fibonacci182 f.sequence == 1);
		f1 : Fibonacci182 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci182(f1.sequence - 1));
	}
}

rule Bootstrap182 {
	when {
		f : Fibonacci182 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate182 {
	when {
		f1 : Fibonacci182 f1.value != -1 {sequence : s1};
		f2 : Fibonacci182 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci182 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result182
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse183 {
	when {
		not(f : Fibonacci183 f.sequence == 1);
		f1 : Fibonacci183 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci183(f1.sequence - 1));
	}
}

rule Bootstrap183 {
	when {
		f : Fibonacci183 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate183 {
	when {
		f1 : Fibonacci183 f1.value != -1 {sequence : s1};
		f2 : Fibonacci183 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci183 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result183
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse184 {
	when {
		not(f : Fibonacci184 f.sequence == 1);
		f1 : Fibonacci184 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci184(f1.sequence - 1));
	}
}

rule Bootstrap184 {
	when {
		f : Fibonacci184 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate184 {
	when {
		f1 : Fibonacci184 f1.value != -1 {sequence : s1};
		f2 : Fibonacci184 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci184 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result184
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse185 {
	when {
		not(f : Fibonacci185 f.sequence == 1);
		f1 : Fibonacci185 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci185(f1.sequence - 1));
	}
}

rule Bootstrap185 {
	when {
		f : Fibonacci185 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate185 {
	when {
		f1 : Fibonacci185 f1.value != -1 {sequence : s1};
		f2 : Fibonacci185 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci185 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result185
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse186 {
	when {
		not(f : Fibonacci186 f.sequence == 1);
		f1 : Fibonacci186 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci186(f1.sequence - 1));
	}
}

rule Bootstrap186 {
	when {
		f : Fibonacci186 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate186 {
	when {
		f1 : Fibonacci186 f1.value != -1 {sequence : s1};
		f2 : Fibonacci186 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci186 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result186
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse187 {
	when {
		not(f : Fibonacci187 f.sequence == 1);
		f1 : Fibonacci187 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci187(f1.sequence - 1));
	}
}

rule Bootstrap187 {
	when {
		f : Fibonacci187 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate187 {
	when {
		f1 : Fibonacci187 f1.value != -1 {sequence : s1};
		f2 : Fibonacci187 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci187 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result187
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse188 {
	when {
		not(f : Fibonacci188 f.sequence == 1);
		f1 : Fibonacci188 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci188(f1.sequence - 1));
	}
}

rule Bootstrap188 {
	when {
		f : Fibonacci188 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate188 {
	when {
		f1 : Fibonacci188 f1.value != -1 {sequence : s1};
		f2 : Fibonacci188 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci188 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result188
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse189 {
	when {
		not(f : Fibonacci189 f.sequence == 1);
		f1 : Fibonacci189 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci189(f1.sequence - 1));
	}
}

rule Bootstrap189 {
	when {
		f : Fibonacci189 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate189 {
	when {
		f1 : Fibonacci189 f1.value != -1 {sequence : s1};
		f2 : Fibonacci189 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci189 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result189
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse190 {
	when {
		not(f : Fibonacci190 f.sequence == 1);
		f1 : Fibonacci190 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci190(f1.sequence - 1));
	}
}

rule Bootstrap190 {
	when {
		f : Fibonacci190 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate190 {
	when {
		f1 : Fibonacci190 f1.value != -1 {sequence : s1};
		f2 : Fibonacci190 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci190 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result190
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse191 {
	when {
		not(f : Fibonacci191 f.sequence == 1);
		f1 : Fibonacci191 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci191(f1.sequence - 1));
	}
}

rule Bootstrap191 {
	when {
		f : Fibonacci191 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate191 {
	when {
		f1 : Fibonacci191 f1.value != -1 {sequence : s1};
		f2 : Fibonacci191 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci191 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result191
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse192 {
	when {
		not(f : Fibonacci192 f.sequence == 1);
		f1 : Fibonacci192 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci192(f1.sequence - 1));
	}
}

rule Bootstrap192 {
	when {
		f : Fibonacci192 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate192 {
	when {
		f1 : Fibonacci192 f1.value != -1 {sequence : s1};
		f2 : Fibonacci192 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci192 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result192
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse193 {
	when {
		not(f : Fibonacci193 f.sequence == 1);
		f1 : Fibonacci193 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci193(f1.sequence - 1));
	}
}

rule Bootstrap193 {
	when {
		f : Fibonacci193 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate193 {
	when {
		f1 : Fibonacci193 f1.value != -1 {sequence : s1};
		f2 : Fibonacci193 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci193 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result193
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse194 {
	when {
		not(f : Fibonacci194 f.sequence == 1);
		f1 : Fibonacci194 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci194(f1.sequence - 1));
	}
}

rule Bootstrap194 {
	when {
		f : Fibonacci194 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate194 {
	when {
		f1 : Fibonacci194 f1.value != -1 {sequence : s1};
		f2 : Fibonacci194 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci194 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result194
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse195 {
	when {
		not(f : Fibonacci195 f.sequence == 1);
		f1 : Fibonacci195 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci195(f1.sequence - 1));
	}
}

rule Bootstrap195 {
	when {
		f : Fibonacci195 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate195 {
	when {
		f1 : Fibonacci195 f1.value != -1 {sequence : s1};
		f2 : Fibonacci195 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci195 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result195
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse196 {
	when {
		not(f : Fibonacci196 f.sequence == 1);
		f1 : Fibonacci196 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci196(f1.sequence - 1));
	}
}

rule Bootstrap196 {
	when {
		f : Fibonacci196 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate196 {
	when {
		f1 : Fibonacci196 f1.value != -1 {sequence : s1};
		f2 : Fibonacci196 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci196 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result196
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse197 {
	when {
		not(f : Fibonacci197 f.sequence == 1);
		f1 : Fibonacci197 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci197(f1.sequence - 1));
	}
}

rule Bootstrap197 {
	when {
		f : Fibonacci197 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate197 {
	when {
		f1 : Fibonacci197 f1.value != -1 {sequence : s1};
		f2 : Fibonacci197 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci197 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result197
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse198 {
	when {
		not(f : Fibonacci198 f.sequence == 1);
		f1 : Fibonacci198 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci198(f1.sequence - 1));
	}
}

rule Bootstrap198 {
	when {
		f : Fibonacci198 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate198 {
	when {
		f1 : Fibonacci198 f1.value != -1 {sequence : s1};
		f2 : Fibonacci198 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci198 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result198
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse199 {
	when {
		not(f : Fibonacci199 f.sequence == 1);
		f1 : Fibonacci199 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci199(f1.sequence - 1));
	}
}

rule Bootstrap199 {
	when {
		f : Fibonacci199 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate199 {
	when {
		f1 : Fibonacci199 f1.value != -1 {sequence : s1};
		f2 : Fibonacci199 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci199 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result199
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse200 {
	when {
		not(f : Fibonacci200 f.sequence == 1);
		f1 : Fibonacci200 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci200(f1.sequence - 1));
	}
}

rule Bootstrap200 {
	when {
		f : Fibonacci200 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate200 {
	when {
		f1 : Fibonacci200 f1.value != -1 {sequence : s1};
		f2 : Fibonacci200 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci200 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result200
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse201 {
	when {
		not(f : Fibonacci201 f.sequence == 1);
		f1 : Fibonacci201 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci201(f1.sequence - 1));
	}
}

rule Bootstrap201 {
	when {
		f : Fibonacci201 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate201 {
	when {
		f1 : Fibonacci201 f1.value != -1 {sequence : s1};
		f2 : Fibonacci201 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci201 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result201
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse202 {
	when {
		not(f : Fibonacci202 f.sequence == 1);
		f1 : Fibonacci202 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci202(f1.sequence - 1));
	}
}

rule Bootstrap202 {
	when {
		f : Fibonacci202 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate202 {
	when {
		f1 : Fibonacci202 f1.value != -1 {sequence : s1};
		f2 : Fibonacci202 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci202 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result202
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse203 {
	when {
		not(f : Fibonacci203 f.sequence == 1);
		f1 : Fibonacci203 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci203(f1.sequence - 1));
	}
}

rule Bootstrap203 {
	when {
		f : Fibonacci203 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate203 {
	when {
		f1 : Fibonacci203 f1.value != -1 {sequence : s1};
		f2 : Fibonacci203 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci203 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result203
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse204 {
	when {
		not(f : Fibonacci204 f.sequence == 1);
		f1 : Fibonacci204 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci204(f1.sequence - 1));
	}
}

rule Bootstrap204 {
	when {
		f : Fibonacci204 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate204 {
	when {
		f1 : Fibonacci204 f1.value != -1 {sequence : s1};
		f2 : Fibonacci204 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci204 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result204
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse205 {
	when {
		not(f : Fibonacci205 f.sequence == 1);
		f1 : Fibonacci205 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci205(f1.sequence - 1));
	}
}

rule Bootstrap205 {
	when {
		f : Fibonacci205 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate205 {
	when {
		f1 : Fibonacci205 f1.value != -1 {sequence : s1};
		f2 : Fibonacci205 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci205 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result205
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse206 {
	when {
		not(f : Fibonacci206 f.sequence == 1);
		f1 : Fibonacci206 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci206(f1.sequence - 1));
	}
}

rule Bootstrap206 {
	when {
		f : Fibonacci206 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate206 {
	when {
		f1 : Fibonacci206 f1.value != -1 {sequence : s1};
		f2 : Fibonacci206 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci206 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result206
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse207 {
	when {
		not(f : Fibonacci207 f.sequence == 1);
		f1 : Fibonacci207 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci207(f1.sequence - 1));
	}
}

rule Bootstrap207 {
	when {
		f : Fibonacci207 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate207 {
	when {
		f1 : Fibonacci207 f1.value != -1 {sequence : s1};
		f2 : Fibonacci207 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci207 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result207
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse208 {
	when {
		not(f : Fibonacci208 f.sequence == 1);
		f1 : Fibonacci208 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci208(f1.sequence - 1));
	}
}

rule Bootstrap208 {
	when {
		f : Fibonacci208 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate208 {
	when {
		f1 : Fibonacci208 f1.value != -1 {sequence : s1};
		f2 : Fibonacci208 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci208 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result208
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse209 {
	when {
		not(f : Fibonacci209 f.sequence == 1);
		f1 : Fibonacci209 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci209(f1.sequence - 1));
	}
}

rule Bootstrap209 {
	when {
		f : Fibonacci209 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate209 {
	when {
		f1 : Fibonacci209 f1.value != -1 {sequence : s1};
		f2 : Fibonacci209 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci209 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result209
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse210 {
	when {
		not(f : Fibonacci210 f.sequence == 1);
		f1 : Fibonacci210 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci210(f1.sequence - 1));
	}
}

rule Bootstrap210 {
	when {
		f : Fibonacci210 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate210 {
	when {
		f1 : Fibonacci210 f1.value != -1 {sequence : s1};
		f2 : Fibonacci210 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci210 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result210
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse211 {
	when {
		not(f : Fibonacci211 f.sequence == 1);
		f1 : Fibonacci211 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci211(f1.sequence - 1));
	}
}

rule Bootstrap211 {
	when {
		f : Fibonacci211 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate211 {
	when {
		f1 : Fibonacci211 f1.value != -1 {sequence : s1};
		f2 : Fibonacci211 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci211 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result211
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse212 {
	when {
		not(f : Fibonacci212 f.sequence == 1);
		f1 : Fibonacci212 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci212(f1.sequence - 1));
	}
}

rule Bootstrap212 {
	when {
		f : Fibonacci212 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate212 {
	when {
		f1 : Fibonacci212 f1.value != -1 {sequence : s1};
		f2 : Fibonacci212 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci212 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result212
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse213 {
	when {
		not(f : Fibonacci213 f.sequence == 1);
		f1 : Fibonacci213 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci213(f1.sequence - 1));
	}
}

rule Bootstrap213 {
	when {
		f : Fibonacci213 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate213 {
	when {
		f1 : Fibonacci213 f1.value != -1 {sequence : s1};
		f2 : Fibonacci213 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci213 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result213
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse214 {
	when {
		not(f : Fibonacci214 f.sequence == 1);
		f1 : Fibonacci214 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci214(f1.sequence - 1));
	}
}

rule Bootstrap214 {
	when {
		f : Fibonacci214 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate214 {
	when {
		f1 : Fibonacci214 f1.value != -1 {sequence : s1};
		f2 : Fibonacci214 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci214 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result214
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse215 {
	when {
		not(f : Fibonacci215 f.sequence == 1);
		f1 : Fibonacci215 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci215(f1.sequence - 1));
	}
}

rule Bootstrap215 {
	when {
		f : Fibonacci215 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate215 {
	when {
		f1 : Fibonacci215 f1.value != -1 {sequence : s1};
		f2 : Fibonacci215 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci215 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result215
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse216 {
	when {
		not(f : Fibonacci216 f.sequence == 1);
		f1 : Fibonacci216 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci216(f1.sequence - 1));
	}
}

rule Bootstrap216 {
	when {
		f : Fibonacci216 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate216 {
	when {
		f1 : Fibonacci216 f1.value != -1 {sequence : s1};
		f2 : Fibonacci216 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci216 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result216
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse217 {
	when {
		not(f : Fibonacci217 f.sequence == 1);
		f1 : Fibonacci217 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci217(f1.sequence - 1));
	}
}

rule Bootstrap217 {
	when {
		f : Fibonacci217 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate217 {
	when {
		f1 : Fibonacci217 f1.value != -1 {sequence : s1};
		f2 : Fibonacci217 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci217 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result217
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse218 {
	when {
		not(f : Fibonacci218 f.sequence == 1);
		f1 : Fibonacci218 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci218(f1.sequence - 1));
	}
}

rule Bootstrap218 {
	when {
		f : Fibonacci218 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate218 {
	when {
		f1 : Fibonacci218 f1.value != -1 {sequence : s1};
		f2 : Fibonacci218 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci218 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result218
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse219 {
	when {
		not(f : Fibonacci219 f.sequence == 1);
		f1 : Fibonacci219 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci219(f1.sequence - 1));
	}
}

rule Bootstrap219 {
	when {
		f : Fibonacci219 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate219 {
	when {
		f1 : Fibonacci219 f1.value != -1 {sequence : s1};
		f2 : Fibonacci219 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci219 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result219
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse220 {
	when {
		not(f : Fibonacci220 f.sequence == 1);
		f1 : Fibonacci220 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci220(f1.sequence - 1));
	}
}

rule Bootstrap220 {
	when {
		f : Fibonacci220 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate220 {
	when {
		f1 : Fibonacci220 f1.value != -1 {sequence : s1};
		f2 : Fibonacci220 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci220 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result220
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse221 {
	when {
		not(f : Fibonacci221 f.sequence == 1);
		f1 : Fibonacci221 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci221(f1.sequence - 1));
	}
}

rule Bootstrap221 {
	when {
		f : Fibonacci221 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate221 {
	when {
		f1 : Fibonacci221 f1.value != -1 {sequence : s1};
		f2 : Fibonacci221 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci221 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result221
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse222 {
	when {
		not(f : Fibonacci222 f.sequence == 1);
		f1 : Fibonacci222 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci222(f1.sequence - 1));
	}
}

rule Bootstrap222 {
	when {
		f : Fibonacci222 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate222 {
	when {
		f1 : Fibonacci222 f1.value != -1 {sequence : s1};
		f2 : Fibonacci222 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci222 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result222
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse223 {
	when {
		not(f : Fibonacci223 f.sequence == 1);
		f1 : Fibonacci223 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci223(f1.sequence - 1));
	}
}

rule Bootstrap223 {
	when {
		f : Fibonacci223 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate223 {
	when {
		f1 : Fibonacci223 f1.value != -1 {sequence : s1};
		f2 : Fibonacci223 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci223 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result223
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse224 {
	when {
		not(f : Fibonacci224 f.sequence == 1);
		f1 : Fibonacci224 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci224(f1.sequence - 1));
	}
}

rule Bootstrap224 {
	when {
		f : Fibonacci224 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate224 {
	when {
		f1 : Fibonacci224 f1.value != -1 {sequence : s1};
		f2 : Fibonacci224 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci224 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result224
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse225 {
	when {
		not(f : Fibonacci225 f.sequence == 1);
		f1 : Fibonacci225 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci225(f1.sequence - 1));
	}
}

rule Bootstrap225 {
	when {
		f : Fibonacci225 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate225 {
	when {
		f1 : Fibonacci225 f1.value != -1 {sequence : s1};
		f2 : Fibonacci225 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci225 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result225
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse226 {
	when {
		not(f : Fibonacci226 f.sequence == 1);
		f1 : Fibonacci226 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci226(f1.sequence - 1));
	}
}

rule Bootstrap226 {
	when {
		f : Fibonacci226 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate226 {
	when {
		f1 : Fibonacci226 f1.value != -1 {sequence : s1};
		f2 : Fibonacci226 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci226 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result226
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse227 {
	when {
		not(f : Fibonacci227 f.sequence == 1);
		f1 : Fibonacci227 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci227(f1.sequence - 1));
	}
}

rule Bootstrap227 {
	when {
		f : Fibonacci227 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate227 {
	when {
		f1 : Fibonacci227 f1.value != -1 {sequence : s1};
		f2 : Fibonacci227 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci227 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result227
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse228 {
	when {
		not(f : Fibonacci228 f.sequence == 1);
		f1 : Fibonacci228 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci228(f1.sequence - 1));
	}
}

rule Bootstrap228 {
	when {
		f : Fibonacci228 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate228 {
	when {
		f1 : Fibonacci228 f1.value != -1 {sequence : s1};
		f2 : Fibonacci228 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci228 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result228
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse229 {
	when {
		not(f : Fibonacci229 f.sequence == 1);
		f1 : Fibonacci229 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci229(f1.sequence - 1));
	}
}

rule Bootstrap229 {
	when {
		f : Fibonacci229 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate229 {
	when {
		f1 : Fibonacci229 f1.value != -1 {sequence : s1};
		f2 : Fibonacci229 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci229 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result229
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse230 {
	when {
		not(f : Fibonacci230 f.sequence == 1);
		f1 : Fibonacci230 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci230(f1.sequence - 1));
	}
}

rule Bootstrap230 {
	when {
		f : Fibonacci230 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate230 {
	when {
		f1 : Fibonacci230 f1.value != -1 {sequence : s1};
		f2 : Fibonacci230 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci230 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result230
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse231 {
	when {
		not(f : Fibonacci231 f.sequence == 1);
		f1 : Fibonacci231 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci231(f1.sequence - 1));
	}
}

rule Bootstrap231 {
	when {
		f : Fibonacci231 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate231 {
	when {
		f1 : Fibonacci231 f1.value != -1 {sequence : s1};
		f2 : Fibonacci231 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci231 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result231
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse232 {
	when {
		not(f : Fibonacci232 f.sequence == 1);
		f1 : Fibonacci232 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci232(f1.sequence - 1));
	}
}

rule Bootstrap232 {
	when {
		f : Fibonacci232 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate232 {
	when {
		f1 : Fibonacci232 f1.value != -1 {sequence : s1};
		f2 : Fibonacci232 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci232 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result232
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse233 {
	when {
		not(f : Fibonacci233 f.sequence == 1);
		f1 : Fibonacci233 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci233(f1.sequence - 1));
	}
}

rule Bootstrap233 {
	when {
		f : Fibonacci233 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate233 {
	when {
		f1 : Fibonacci233 f1.value != -1 {sequence : s1};
		f2 : Fibonacci233 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci233 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result233
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse234 {
	when {
		not(f : Fibonacci234 f.sequence == 1);
		f1 : Fibonacci234 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci234(f1.sequence - 1));
	}
}

rule Bootstrap234 {
	when {
		f : Fibonacci234 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate234 {
	when {
		f1 : Fibonacci234 f1.value != -1 {sequence : s1};
		f2 : Fibonacci234 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci234 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result234
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse235 {
	when {
		not(f : Fibonacci235 f.sequence == 1);
		f1 : Fibonacci235 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci235(f1.sequence - 1));
	}
}

rule Bootstrap235 {
	when {
		f : Fibonacci235 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate235 {
	when {
		f1 : Fibonacci235 f1.value != -1 {sequence : s1};
		f2 : Fibonacci235 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci235 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result235
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse236 {
	when {
		not(f : Fibonacci236 f.sequence == 1);
		f1 : Fibonacci236 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci236(f1.sequence - 1));
	}
}

rule Bootstrap236 {
	when {
		f : Fibonacci236 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate236 {
	when {
		f1 : Fibonacci236 f1.value != -1 {sequence : s1};
		f2 : Fibonacci236 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci236 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result236
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse237 {
	when {
		not(f : Fibonacci237 f.sequence == 1);
		f1 : Fibonacci237 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci237(f1.sequence - 1));
	}
}

rule Bootstrap237 {
	when {
		f : Fibonacci237 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate237 {
	when {
		f1 : Fibonacci237 f1.value != -1 {sequence : s1};
		f2 : Fibonacci237 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci237 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result237
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse238 {
	when {
		not(f : Fibonacci238 f.sequence == 1);
		f1 : Fibonacci238 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci238(f1.sequence - 1));
	}
}

rule Bootstrap238 {
	when {
		f : Fibonacci238 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate238 {
	when {
		f1 : Fibonacci238 f1.value != -1 {sequence : s1};
		f2 : Fibonacci238 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci238 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result238
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse239 {
	when {
		not(f : Fibonacci239 f.sequence == 1);
		f1 : Fibonacci239 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci239(f1.sequence - 1));
	}
}

rule Bootstrap239 {
	when {
		f : Fibonacci239 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate239 {
	when {
		f1 : Fibonacci239 f1.value != -1 {sequence : s1};
		f2 : Fibonacci239 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci239 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result239
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse240 {
	when {
		not(f : Fibonacci240 f.sequence == 1);
		f1 : Fibonacci240 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci240(f1.sequence - 1));
	}
}

rule Bootstrap240 {
	when {
		f : Fibonacci240 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate240 {
	when {
		f1 : Fibonacci240 f1.value != -1 {sequence : s1};
		f2 : Fibonacci240 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci240 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result240
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse241 {
	when {
		not(f : Fibonacci241 f.sequence == 1);
		f1 : Fibonacci241 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci241(f1.sequence - 1));
	}
}

rule Bootstrap241 {
	when {
		f : Fibonacci241 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate241 {
	when {
		f1 : Fibonacci241 f1.value != -1 {sequence : s1};
		f2 : Fibonacci241 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci241 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result241
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse242 {
	when {
		not(f : Fibonacci242 f.sequence == 1);
		f1 : Fibonacci242 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci242(f1.sequence - 1));
	}
}

rule Bootstrap242 {
	when {
		f : Fibonacci242 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate242 {
	when {
		f1 : Fibonacci242 f1.value != -1 {sequence : s1};
		f2 : Fibonacci242 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci242 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result242
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse243 {
	when {
		not(f : Fibonacci243 f.sequence == 1);
		f1 : Fibonacci243 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci243(f1.sequence - 1));
	}
}

rule Bootstrap243 {
	when {
		f : Fibonacci243 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate243 {
	when {
		f1 : Fibonacci243 f1.value != -1 {sequence : s1};
		f2 : Fibonacci243 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci243 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result243
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse244 {
	when {
		not(f : Fibonacci244 f.sequence == 1);
		f1 : Fibonacci244 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci244(f1.sequence - 1));
	}
}

rule Bootstrap244 {
	when {
		f : Fibonacci244 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate244 {
	when {
		f1 : Fibonacci244 f1.value != -1 {sequence : s1};
		f2 : Fibonacci244 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci244 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result244
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse245 {
	when {
		not(f : Fibonacci245 f.sequence == 1);
		f1 : Fibonacci245 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci245(f1.sequence - 1));
	}
}

rule Bootstrap245 {
	when {
		f : Fibonacci245 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate245 {
	when {
		f1 : Fibonacci245 f1.value != -1 {sequence : s1};
		f2 : Fibonacci245 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci245 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result245
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse246 {
	when {
		not(f : Fibonacci246 f.sequence == 1);
		f1 : Fibonacci246 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci246(f1.sequence - 1));
	}
}

rule Bootstrap246 {
	when {
		f : Fibonacci246 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate246 {
	when {
		f1 : Fibonacci246 f1.value != -1 {sequence : s1};
		f2 : Fibonacci246 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci246 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result246
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse247 {
	when {
		not(f : Fibonacci247 f.sequence == 1);
		f1 : Fibonacci247 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci247(f1.sequence - 1));
	}
}

rule Bootstrap247 {
	when {
		f : Fibonacci247 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate247 {
	when {
		f1 : Fibonacci247 f1.value != -1 {sequence : s1};
		f2 : Fibonacci247 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci247 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result247
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse248 {
	when {
		not(f : Fibonacci248 f.sequence == 1);
		f1 : Fibonacci248 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci248(f1.sequence - 1));
	}
}

rule Bootstrap248 {
	when {
		f : Fibonacci248 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate248 {
	when {
		f1 : Fibonacci248 f1.value != -1 {sequence : s1};
		f2 : Fibonacci248 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci248 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result248
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse249 {
	when {
		not(f : Fibonacci249 f.sequence == 1);
		f1 : Fibonacci249 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci249(f1.sequence - 1));
	}
}

rule Bootstrap249 {
	when {
		f : Fibonacci249 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate249 {
	when {
		f1 : Fibonacci249 f1.value != -1 {sequence : s1};
		f2 : Fibonacci249 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci249 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result249
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse250 {
	when {
		not(f : Fibonacci250 f.sequence == 1);
		f1 : Fibonacci250 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci250(f1.sequence - 1));
	}
}

rule Bootstrap250 {
	when {
		f : Fibonacci250 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate250 {
	when {
		f1 : Fibonacci250 f1.value != -1 {sequence : s1};
		f2 : Fibonacci250 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci250 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result250
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse251 {
	when {
		not(f : Fibonacci251 f.sequence == 1);
		f1 : Fibonacci251 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci251(f1.sequence - 1));
	}
}

rule Bootstrap251 {
	when {
		f : Fibonacci251 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate251 {
	when {
		f1 : Fibonacci251 f1.value != -1 {sequence : s1};
		f2 : Fibonacci251 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci251 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result251
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse252 {
	when {
		not(f : Fibonacci252 f.sequence == 1);
		f1 : Fibonacci252 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci252(f1.sequence - 1));
	}
}

rule Bootstrap252 {
	when {
		f : Fibonacci252 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate252 {
	when {
		f1 : Fibonacci252 f1.value != -1 {sequence : s1};
		f2 : Fibonacci252 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci252 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result252
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse253 {
	when {
		not(f : Fibonacci253 f.sequence == 1);
		f1 : Fibonacci253 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci253(f1.sequence - 1));
	}
}

rule Bootstrap253 {
	when {
		f : Fibonacci253 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate253 {
	when {
		f1 : Fibonacci253 f1.value != -1 {sequence : s1};
		f2 : Fibonacci253 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci253 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result253
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse254 {
	when {
		not(f : Fibonacci254 f.sequence == 1);
		f1 : Fibonacci254 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci254(f1.sequence - 1));
	}
}

rule Bootstrap254 {
	when {
		f : Fibonacci254 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate254 {
	when {
		f1 : Fibonacci254 f1.value != -1 {sequence : s1};
		f2 : Fibonacci254 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci254 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result254
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse255 {
	when {
		not(f : Fibonacci255 f.sequence == 1);
		f1 : Fibonacci255 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci255(f1.sequence - 1));
	}
}

rule Bootstrap255 {
	when {
		f : Fibonacci255 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate255 {
	when {
		f1 : Fibonacci255 f1.value != -1 {sequence : s1};
		f2 : Fibonacci255 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci255 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result255
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse256 {
	when {
		not(f : Fibonacci256 f.sequence == 1);
		f1 : Fibonacci256 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci256(f1.sequence - 1));
	}
}

rule Bootstrap256 {
	when {
		f : Fibonacci256 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate256 {
	when {
		f1 : Fibonacci256 f1.value != -1 {sequence : s1};
		f2 : Fibonacci256 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci256 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result256
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse257 {
	when {
		not(f : Fibonacci257 f.sequence == 1);
		f1 : Fibonacci257 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci257(f1.sequence - 1));
	}
}

rule Bootstrap257 {
	when {
		f : Fibonacci257 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate257 {
	when {
		f1 : Fibonacci257 f1.value != -1 {sequence : s1};
		f2 : Fibonacci257 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci257 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result257
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse258 {
	when {
		not(f : Fibonacci258 f.sequence == 1);
		f1 : Fibonacci258 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci258(f1.sequence - 1));
	}
}

rule Bootstrap258 {
	when {
		f : Fibonacci258 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate258 {
	when {
		f1 : Fibonacci258 f1.value != -1 {sequence : s1};
		f2 : Fibonacci258 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci258 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result258
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse259 {
	when {
		not(f : Fibonacci259 f.sequence == 1);
		f1 : Fibonacci259 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci259(f1.sequence - 1));
	}
}

rule Bootstrap259 {
	when {
		f : Fibonacci259 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate259 {
	when {
		f1 : Fibonacci259 f1.value != -1 {sequence : s1};
		f2 : Fibonacci259 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci259 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result259
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse260 {
	when {
		not(f : Fibonacci260 f.sequence == 1);
		f1 : Fibonacci260 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci260(f1.sequence - 1));
	}
}

rule Bootstrap260 {
	when {
		f : Fibonacci260 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate260 {
	when {
		f1 : Fibonacci260 f1.value != -1 {sequence : s1};
		f2 : Fibonacci260 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci260 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result260
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse261 {
	when {
		not(f : Fibonacci261 f.sequence == 1);
		f1 : Fibonacci261 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci261(f1.sequence - 1));
	}
}

rule Bootstrap261 {
	when {
		f : Fibonacci261 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate261 {
	when {
		f1 : Fibonacci261 f1.value != -1 {sequence : s1};
		f2 : Fibonacci261 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci261 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result261
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse262 {
	when {
		not(f : Fibonacci262 f.sequence == 1);
		f1 : Fibonacci262 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci262(f1.sequence - 1));
	}
}

rule Bootstrap262 {
	when {
		f : Fibonacci262 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate262 {
	when {
		f1 : Fibonacci262 f1.value != -1 {sequence : s1};
		f2 : Fibonacci262 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci262 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result262
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse263 {
	when {
		not(f : Fibonacci263 f.sequence == 1);
		f1 : Fibonacci263 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci263(f1.sequence - 1));
	}
}

rule Bootstrap263 {
	when {
		f : Fibonacci263 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate263 {
	when {
		f1 : Fibonacci263 f1.value != -1 {sequence : s1};
		f2 : Fibonacci263 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci263 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result263
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse264 {
	when {
		not(f : Fibonacci264 f.sequence == 1);
		f1 : Fibonacci264 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci264(f1.sequence - 1));
	}
}

rule Bootstrap264 {
	when {
		f : Fibonacci264 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate264 {
	when {
		f1 : Fibonacci264 f1.value != -1 {sequence : s1};
		f2 : Fibonacci264 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci264 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result264
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse265 {
	when {
		not(f : Fibonacci265 f.sequence == 1);
		f1 : Fibonacci265 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci265(f1.sequence - 1));
	}
}

rule Bootstrap265 {
	when {
		f : Fibonacci265 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate265 {
	when {
		f1 : Fibonacci265 f1.value != -1 {sequence : s1};
		f2 : Fibonacci265 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci265 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result265
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse266 {
	when {
		not(f : Fibonacci266 f.sequence == 1);
		f1 : Fibonacci266 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci266(f1.sequence - 1));
	}
}

rule Bootstrap266 {
	when {
		f : Fibonacci266 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate266 {
	when {
		f1 : Fibonacci266 f1.value != -1 {sequence : s1};
		f2 : Fibonacci266 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci266 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result266
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse267 {
	when {
		not(f : Fibonacci267 f.sequence == 1);
		f1 : Fibonacci267 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci267(f1.sequence - 1));
	}
}

rule Bootstrap267 {
	when {
		f : Fibonacci267 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate267 {
	when {
		f1 : Fibonacci267 f1.value != -1 {sequence : s1};
		f2 : Fibonacci267 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci267 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result267
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse268 {
	when {
		not(f : Fibonacci268 f.sequence == 1);
		f1 : Fibonacci268 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci268(f1.sequence - 1));
	}
}

rule Bootstrap268 {
	when {
		f : Fibonacci268 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate268 {
	when {
		f1 : Fibonacci268 f1.value != -1 {sequence : s1};
		f2 : Fibonacci268 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci268 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result268
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse269 {
	when {
		not(f : Fibonacci269 f.sequence == 1);
		f1 : Fibonacci269 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci269(f1.sequence - 1));
	}
}

rule Bootstrap269 {
	when {
		f : Fibonacci269 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate269 {
	when {
		f1 : Fibonacci269 f1.value != -1 {sequence : s1};
		f2 : Fibonacci269 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci269 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result269
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse270 {
	when {
		not(f : Fibonacci270 f.sequence == 1);
		f1 : Fibonacci270 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci270(f1.sequence - 1));
	}
}

rule Bootstrap270 {
	when {
		f : Fibonacci270 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate270 {
	when {
		f1 : Fibonacci270 f1.value != -1 {sequence : s1};
		f2 : Fibonacci270 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci270 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result270
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse271 {
	when {
		not(f : Fibonacci271 f.sequence == 1);
		f1 : Fibonacci271 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci271(f1.sequence - 1));
	}
}

rule Bootstrap271 {
	when {
		f : Fibonacci271 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate271 {
	when {
		f1 : Fibonacci271 f1.value != -1 {sequence : s1};
		f2 : Fibonacci271 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci271 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result271
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse272 {
	when {
		not(f : Fibonacci272 f.sequence == 1);
		f1 : Fibonacci272 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci272(f1.sequence - 1));
	}
}

rule Bootstrap272 {
	when {
		f : Fibonacci272 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate272 {
	when {
		f1 : Fibonacci272 f1.value != -1 {sequence : s1};
		f2 : Fibonacci272 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci272 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result272
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse273 {
	when {
		not(f : Fibonacci273 f.sequence == 1);
		f1 : Fibonacci273 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci273(f1.sequence - 1));
	}
}

rule Bootstrap273 {
	when {
		f : Fibonacci273 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate273 {
	when {
		f1 : Fibonacci273 f1.value != -1 {sequence : s1};
		f2 : Fibonacci273 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci273 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result273
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse274 {
	when {
		not(f : Fibonacci274 f.sequence == 1);
		f1 : Fibonacci274 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci274(f1.sequence - 1));
	}
}

rule Bootstrap274 {
	when {
		f : Fibonacci274 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate274 {
	when {
		f1 : Fibonacci274 f1.value != -1 {sequence : s1};
		f2 : Fibonacci274 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci274 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result274
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse275 {
	when {
		not(f : Fibonacci275 f.sequence == 1);
		f1 : Fibonacci275 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci275(f1.sequence - 1));
	}
}

rule Bootstrap275 {
	when {
		f : Fibonacci275 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate275 {
	when {
		f1 : Fibonacci275 f1.value != -1 {sequence : s1};
		f2 : Fibonacci275 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci275 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result275
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse276 {
	when {
		not(f : Fibonacci276 f.sequence == 1);
		f1 : Fibonacci276 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci276(f1.sequence - 1));
	}
}

rule Bootstrap276 {
	when {
		f : Fibonacci276 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate276 {
	when {
		f1 : Fibonacci276 f1.value != -1 {sequence : s1};
		f2 : Fibonacci276 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci276 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result276
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse277 {
	when {
		not(f : Fibonacci277 f.sequence == 1);
		f1 : Fibonacci277 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci277(f1.sequence - 1));
	}
}

rule Bootstrap277 {
	when {
		f : Fibonacci277 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate277 {
	when {
		f1 : Fibonacci277 f1.value != -1 {sequence : s1};
		f2 : Fibonacci277 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci277 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result277
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse278 {
	when {
		not(f : Fibonacci278 f.sequence == 1);
		f1 : Fibonacci278 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci278(f1.sequence - 1));
	}
}

rule Bootstrap278 {
	when {
		f : Fibonacci278 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate278 {
	when {
		f1 : Fibonacci278 f1.value != -1 {sequence : s1};
		f2 : Fibonacci278 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci278 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result278
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse279 {
	when {
		not(f : Fibonacci279 f.sequence == 1);
		f1 : Fibonacci279 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci279(f1.sequence - 1));
	}
}

rule Bootstrap279 {
	when {
		f : Fibonacci279 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate279 {
	when {
		f1 : Fibonacci279 f1.value != -1 {sequence : s1};
		f2 : Fibonacci279 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci279 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result279
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse280 {
	when {
		not(f : Fibonacci280 f.sequence == 1);
		f1 : Fibonacci280 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci280(f1.sequence - 1));
	}
}

rule Bootstrap280 {
	when {
		f : Fibonacci280 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate280 {
	when {
		f1 : Fibonacci280 f1.value != -1 {sequence : s1};
		f2 : Fibonacci280 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci280 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result280
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse281 {
	when {
		not(f : Fibonacci281 f.sequence == 1);
		f1 : Fibonacci281 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci281(f1.sequence - 1));
	}
}

rule Bootstrap281 {
	when {
		f : Fibonacci281 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate281 {
	when {
		f1 : Fibonacci281 f1.value != -1 {sequence : s1};
		f2 : Fibonacci281 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci281 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result281
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse282 {
	when {
		not(f : Fibonacci282 f.sequence == 1);
		f1 : Fibonacci282 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci282(f1.sequence - 1));
	}
}

rule Bootstrap282 {
	when {
		f : Fibonacci282 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate282 {
	when {
		f1 : Fibonacci282 f1.value != -1 {sequence : s1};
		f2 : Fibonacci282 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci282 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result282
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse283 {
	when {
		not(f : Fibonacci283 f.sequence == 1);
		f1 : Fibonacci283 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci283(f1.sequence - 1));
	}
}

rule Bootstrap283 {
	when {
		f : Fibonacci283 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate283 {
	when {
		f1 : Fibonacci283 f1.value != -1 {sequence : s1};
		f2 : Fibonacci283 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci283 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result283
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse284 {
	when {
		not(f : Fibonacci284 f.sequence == 1);
		f1 : Fibonacci284 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci284(f1.sequence - 1));
	}
}

rule Bootstrap284 {
	when {
		f : Fibonacci284 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate284 {
	when {
		f1 : Fibonacci284 f1.value != -1 {sequence : s1};
		f2 : Fibonacci284 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci284 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result284
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse285 {
	when {
		not(f : Fibonacci285 f.sequence == 1);
		f1 : Fibonacci285 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci285(f1.sequence - 1));
	}
}

rule Bootstrap285 {
	when {
		f : Fibonacci285 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate285 {
	when {
		f1 : Fibonacci285 f1.value != -1 {sequence : s1};
		f2 : Fibonacci285 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci285 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result285
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse286 {
	when {
		not(f : Fibonacci286 f.sequence == 1);
		f1 : Fibonacci286 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci286(f1.sequence - 1));
	}
}

rule Bootstrap286 {
	when {
		f : Fibonacci286 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate286 {
	when {
		f1 : Fibonacci286 f1.value != -1 {sequence : s1};
		f2 : Fibonacci286 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci286 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result286
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse287 {
	when {
		not(f : Fibonacci287 f.sequence == 1);
		f1 : Fibonacci287 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci287(f1.sequence - 1));
	}
}

rule Bootstrap287 {
	when {
		f : Fibonacci287 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate287 {
	when {
		f1 : Fibonacci287 f1.value != -1 {sequence : s1};
		f2 : Fibonacci287 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci287 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result287
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse288 {
	when {
		not(f : Fibonacci288 f.sequence == 1);
		f1 : Fibonacci288 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci288(f1.sequence - 1));
	}
}

rule Bootstrap288 {
	when {
		f : Fibonacci288 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate288 {
	when {
		f1 : Fibonacci288 f1.value != -1 {sequence : s1};
		f2 : Fibonacci288 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci288 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result288
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse289 {
	when {
		not(f : Fibonacci289 f.sequence == 1);
		f1 : Fibonacci289 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci289(f1.sequence - 1));
	}
}

rule Bootstrap289 {
	when {
		f : Fibonacci289 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate289 {
	when {
		f1 : Fibonacci289 f1.value != -1 {sequence : s1};
		f2 : Fibonacci289 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci289 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result289
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse290 {
	when {
		not(f : Fibonacci290 f.sequence == 1);
		f1 : Fibonacci290 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci290(f1.sequence - 1));
	}
}

rule Bootstrap290 {
	when {
		f : Fibonacci290 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate290 {
	when {
		f1 : Fibonacci290 f1.value != -1 {sequence : s1};
		f2 : Fibonacci290 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci290 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result290
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse291 {
	when {
		not(f : Fibonacci291 f.sequence == 1);
		f1 : Fibonacci291 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci291(f1.sequence - 1));
	}
}

rule Bootstrap291 {
	when {
		f : Fibonacci291 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate291 {
	when {
		f1 : Fibonacci291 f1.value != -1 {sequence : s1};
		f2 : Fibonacci291 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci291 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result291
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse292 {
	when {
		not(f : Fibonacci292 f.sequence == 1);
		f1 : Fibonacci292 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci292(f1.sequence - 1));
	}
}

rule Bootstrap292 {
	when {
		f : Fibonacci292 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate292 {
	when {
		f1 : Fibonacci292 f1.value != -1 {sequence : s1};
		f2 : Fibonacci292 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci292 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result292
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse293 {
	when {
		not(f : Fibonacci293 f.sequence == 1);
		f1 : Fibonacci293 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci293(f1.sequence - 1));
	}
}

rule Bootstrap293 {
	when {
		f : Fibonacci293 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate293 {
	when {
		f1 : Fibonacci293 f1.value != -1 {sequence : s1};
		f2 : Fibonacci293 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci293 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result293
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse294 {
	when {
		not(f : Fibonacci294 f.sequence == 1);
		f1 : Fibonacci294 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci294(f1.sequence - 1));
	}
}

rule Bootstrap294 {
	when {
		f : Fibonacci294 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate294 {
	when {
		f1 : Fibonacci294 f1.value != -1 {sequence : s1};
		f2 : Fibonacci294 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci294 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result294
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse295 {
	when {
		not(f : Fibonacci295 f.sequence == 1);
		f1 : Fibonacci295 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci295(f1.sequence - 1));
	}
}

rule Bootstrap295 {
	when {
		f : Fibonacci295 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate295 {
	when {
		f1 : Fibonacci295 f1.value != -1 {sequence : s1};
		f2 : Fibonacci295 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci295 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result295
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse296 {
	when {
		not(f : Fibonacci296 f.sequence == 1);
		f1 : Fibonacci296 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci296(f1.sequence - 1));
	}
}

rule Bootstrap296 {
	when {
		f : Fibonacci296 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate296 {
	when {
		f1 : Fibonacci296 f1.value != -1 {sequence : s1};
		f2 : Fibonacci296 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci296 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result296
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse297 {
	when {
		not(f : Fibonacci297 f.sequence == 1);
		f1 : Fibonacci297 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci297(f1.sequence - 1));
	}
}

rule Bootstrap297 {
	when {
		f : Fibonacci297 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate297 {
	when {
		f1 : Fibonacci297 f1.value != -1 {sequence : s1};
		f2 : Fibonacci297 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci297 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result297
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse298 {
	when {
		not(f : Fibonacci298 f.sequence == 1);
		f1 : Fibonacci298 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci298(f1.sequence - 1));
	}
}

rule Bootstrap298 {
	when {
		f : Fibonacci298 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate298 {
	when {
		f1 : Fibonacci298 f1.value != -1 {sequence : s1};
		f2 : Fibonacci298 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci298 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result298
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse299 {
	when {
		not(f : Fibonacci299 f.sequence == 1);
		f1 : Fibonacci299 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci299(f1.sequence - 1));
	}
}

rule Bootstrap299 {
	when {
		f : Fibonacci299 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate299 {
	when {
		f1 : Fibonacci299 f1.value != -1 {sequence : s1};
		f2 : Fibonacci299 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci299 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result299
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse300 {
	when {
		not(f : Fibonacci300 f.sequence == 1);
		f1 : Fibonacci300 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci300(f1.sequence - 1));
	}
}

rule Bootstrap300 {
	when {
		f : Fibonacci300 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate300 {
	when {
		f1 : Fibonacci300 f1.value != -1 {sequence : s1};
		f2 : Fibonacci300 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci300 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result300
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse301 {
	when {
		not(f : Fibonacci301 f.sequence == 1);
		f1 : Fibonacci301 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci301(f1.sequence - 1));
	}
}

rule Bootstrap301 {
	when {
		f : Fibonacci301 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate301 {
	when {
		f1 : Fibonacci301 f1.value != -1 {sequence : s1};
		f2 : Fibonacci301 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci301 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result301
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse302 {
	when {
		not(f : Fibonacci302 f.sequence == 1);
		f1 : Fibonacci302 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci302(f1.sequence - 1));
	}
}

rule Bootstrap302 {
	when {
		f : Fibonacci302 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate302 {
	when {
		f1 : Fibonacci302 f1.value != -1 {sequence : s1};
		f2 : Fibonacci302 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci302 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result302
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse303 {
	when {
		not(f : Fibonacci303 f.sequence == 1);
		f1 : Fibonacci303 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci303(f1.sequence - 1));
	}
}

rule Bootstrap303 {
	when {
		f : Fibonacci303 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate303 {
	when {
		f1 : Fibonacci303 f1.value != -1 {sequence : s1};
		f2 : Fibonacci303 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci303 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result303
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse304 {
	when {
		not(f : Fibonacci304 f.sequence == 1);
		f1 : Fibonacci304 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci304(f1.sequence - 1));
	}
}

rule Bootstrap304 {
	when {
		f : Fibonacci304 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate304 {
	when {
		f1 : Fibonacci304 f1.value != -1 {sequence : s1};
		f2 : Fibonacci304 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci304 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result304
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse305 {
	when {
		not(f : Fibonacci305 f.sequence == 1);
		f1 : Fibonacci305 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci305(f1.sequence - 1));
	}
}

rule Bootstrap305 {
	when {
		f : Fibonacci305 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate305 {
	when {
		f1 : Fibonacci305 f1.value != -1 {sequence : s1};
		f2 : Fibonacci305 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci305 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result305
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse306 {
	when {
		not(f : Fibonacci306 f.sequence == 1);
		f1 : Fibonacci306 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci306(f1.sequence - 1));
	}
}

rule Bootstrap306 {
	when {
		f : Fibonacci306 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate306 {
	when {
		f1 : Fibonacci306 f1.value != -1 {sequence : s1};
		f2 : Fibonacci306 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci306 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result306
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse307 {
	when {
		not(f : Fibonacci307 f.sequence == 1);
		f1 : Fibonacci307 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci307(f1.sequence - 1));
	}
}

rule Bootstrap307 {
	when {
		f : Fibonacci307 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate307 {
	when {
		f1 : Fibonacci307 f1.value != -1 {sequence : s1};
		f2 : Fibonacci307 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci307 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result307
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse308 {
	when {
		not(f : Fibonacci308 f.sequence == 1);
		f1 : Fibonacci308 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci308(f1.sequence - 1));
	}
}

rule Bootstrap308 {
	when {
		f : Fibonacci308 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate308 {
	when {
		f1 : Fibonacci308 f1.value != -1 {sequence : s1};
		f2 : Fibonacci308 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci308 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result308
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse309 {
	when {
		not(f : Fibonacci309 f.sequence == 1);
		f1 : Fibonacci309 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci309(f1.sequence - 1));
	}
}

rule Bootstrap309 {
	when {
		f : Fibonacci309 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate309 {
	when {
		f1 : Fibonacci309 f1.value != -1 {sequence : s1};
		f2 : Fibonacci309 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci309 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result309
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse310 {
	when {
		not(f : Fibonacci310 f.sequence == 1);
		f1 : Fibonacci310 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci310(f1.sequence - 1));
	}
}

rule Bootstrap310 {
	when {
		f : Fibonacci310 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate310 {
	when {
		f1 : Fibonacci310 f1.value != -1 {sequence : s1};
		f2 : Fibonacci310 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci310 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result310
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse311 {
	when {
		not(f : Fibonacci311 f.sequence == 1);
		f1 : Fibonacci311 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci311(f1.sequence - 1));
	}
}

rule Bootstrap311 {
	when {
		f : Fibonacci311 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate311 {
	when {
		f1 : Fibonacci311 f1.value != -1 {sequence : s1};
		f2 : Fibonacci311 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci311 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result311
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse312 {
	when {
		not(f : Fibonacci312 f.sequence == 1);
		f1 : Fibonacci312 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci312(f1.sequence - 1));
	}
}

rule Bootstrap312 {
	when {
		f : Fibonacci312 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate312 {
	when {
		f1 : Fibonacci312 f1.value != -1 {sequence : s1};
		f2 : Fibonacci312 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci312 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result312
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse313 {
	when {
		not(f : Fibonacci313 f.sequence == 1);
		f1 : Fibonacci313 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci313(f1.sequence - 1));
	}
}

rule Bootstrap313 {
	when {
		f : Fibonacci313 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate313 {
	when {
		f1 : Fibonacci313 f1.value != -1 {sequence : s1};
		f2 : Fibonacci313 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci313 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result313
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse314 {
	when {
		not(f : Fibonacci314 f.sequence == 1);
		f1 : Fibonacci314 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci314(f1.sequence - 1));
	}
}

rule Bootstrap314 {
	when {
		f : Fibonacci314 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate314 {
	when {
		f1 : Fibonacci314 f1.value != -1 {sequence : s1};
		f2 : Fibonacci314 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci314 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result314
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse315 {
	when {
		not(f : Fibonacci315 f.sequence == 1);
		f1 : Fibonacci315 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci315(f1.sequence - 1));
	}
}

rule Bootstrap315 {
	when {
		f : Fibonacci315 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate315 {
	when {
		f1 : Fibonacci315 f1.value != -1 {sequence : s1};
		f2 : Fibonacci315 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci315 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result315
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse316 {
	when {
		not(f : Fibonacci316 f.sequence == 1);
		f1 : Fibonacci316 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci316(f1.sequence - 1));
	}
}

rule Bootstrap316 {
	when {
		f : Fibonacci316 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate316 {
	when {
		f1 : Fibonacci316 f1.value != -1 {sequence : s1};
		f2 : Fibonacci316 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci316 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result316
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse317 {
	when {
		not(f : Fibonacci317 f.sequence == 1);
		f1 : Fibonacci317 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci317(f1.sequence - 1));
	}
}

rule Bootstrap317 {
	when {
		f : Fibonacci317 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate317 {
	when {
		f1 : Fibonacci317 f1.value != -1 {sequence : s1};
		f2 : Fibonacci317 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci317 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result317
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse318 {
	when {
		not(f : Fibonacci318 f.sequence == 1);
		f1 : Fibonacci318 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci318(f1.sequence - 1));
	}
}

rule Bootstrap318 {
	when {
		f : Fibonacci318 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate318 {
	when {
		f1 : Fibonacci318 f1.value != -1 {sequence : s1};
		f2 : Fibonacci318 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci318 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result318
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse319 {
	when {
		not(f : Fibonacci319 f.sequence == 1);
		f1 : Fibonacci319 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci319(f1.sequence - 1));
	}
}

rule Bootstrap319 {
	when {
		f : Fibonacci319 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate319 {
	when {
		f1 : Fibonacci319 f1.value != -1 {sequence : s1};
		f2 : Fibonacci319 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci319 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result319
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse320 {
	when {
		not(f : Fibonacci320 f.sequence == 1);
		f1 : Fibonacci320 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci320(f1.sequence - 1));
	}
}

rule Bootstrap320 {
	when {
		f : Fibonacci320 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate320 {
	when {
		f1 : Fibonacci320 f1.value != -1 {sequence : s1};
		f2 : Fibonacci320 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci320 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result320
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse321 {
	when {
		not(f : Fibonacci321 f.sequence == 1);
		f1 : Fibonacci321 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci321(f1.sequence - 1));
	}
}

rule Bootstrap321 {
	when {
		f : Fibonacci321 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate321 {
	when {
		f1 : Fibonacci321 f1.value != -1 {sequence : s1};
		f2 : Fibonacci321 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci321 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result321
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse322 {
	when {
		not(f : Fibonacci322 f.sequence == 1);
		f1 : Fibonacci322 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci322(f1.sequence - 1));
	}
}

rule Bootstrap322 {
	when {
		f : Fibonacci322 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate322 {
	when {
		f1 : Fibonacci322 f1.value != -1 {sequence : s1};
		f2 : Fibonacci322 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci322 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result322
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse323 {
	when {
		not(f : Fibonacci323 f.sequence == 1);
		f1 : Fibonacci323 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci323(f1.sequence - 1));
	}
}

rule Bootstrap323 {
	when {
		f : Fibonacci323 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate323 {
	when {
		f1 : Fibonacci323 f1.value != -1 {sequence : s1};
		f2 : Fibonacci323 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci323 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result323
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse324 {
	when {
		not(f : Fibonacci324 f.sequence == 1);
		f1 : Fibonacci324 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci324(f1.sequence - 1));
	}
}

rule Bootstrap324 {
	when {
		f : Fibonacci324 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate324 {
	when {
		f1 : Fibonacci324 f1.value != -1 {sequence : s1};
		f2 : Fibonacci324 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci324 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result324
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse325 {
	when {
		not(f : Fibonacci325 f.sequence == 1);
		f1 : Fibonacci325 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci325(f1.sequence - 1));
	}
}

rule Bootstrap325 {
	when {
		f : Fibonacci325 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate325 {
	when {
		f1 : Fibonacci325 f1.value != -1 {sequence : s1};
		f2 : Fibonacci325 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci325 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result325
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse326 {
	when {
		not(f : Fibonacci326 f.sequence == 1);
		f1 : Fibonacci326 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci326(f1.sequence - 1));
	}
}

rule Bootstrap326 {
	when {
		f : Fibonacci326 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate326 {
	when {
		f1 : Fibonacci326 f1.value != -1 {sequence : s1};
		f2 : Fibonacci326 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci326 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result326
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse327 {
	when {
		not(f : Fibonacci327 f.sequence == 1);
		f1 : Fibonacci327 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci327(f1.sequence - 1));
	}
}

rule Bootstrap327 {
	when {
		f : Fibonacci327 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate327 {
	when {
		f1 : Fibonacci327 f1.value != -1 {sequence : s1};
		f2 : Fibonacci327 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci327 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result327
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse328 {
	when {
		not(f : Fibonacci328 f.sequence == 1);
		f1 : Fibonacci328 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci328(f1.sequence - 1));
	}
}

rule Bootstrap328 {
	when {
		f : Fibonacci328 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate328 {
	when {
		f1 : Fibonacci328 f1.value != -1 {sequence : s1};
		f2 : Fibonacci328 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci328 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result328
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse329 {
	when {
		not(f : Fibonacci329 f.sequence == 1);
		f1 : Fibonacci329 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci329(f1.sequence - 1));
	}
}

rule Bootstrap329 {
	when {
		f : Fibonacci329 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate329 {
	when {
		f1 : Fibonacci329 f1.value != -1 {sequence : s1};
		f2 : Fibonacci329 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci329 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result329
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse330 {
	when {
		not(f : Fibonacci330 f.sequence == 1);
		f1 : Fibonacci330 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci330(f1.sequence - 1));
	}
}

rule Bootstrap330 {
	when {
		f : Fibonacci330 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate330 {
	when {
		f1 : Fibonacci330 f1.value != -1 {sequence : s1};
		f2 : Fibonacci330 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci330 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result330
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse331 {
	when {
		not(f : Fibonacci331 f.sequence == 1);
		f1 : Fibonacci331 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci331(f1.sequence - 1));
	}
}

rule Bootstrap331 {
	when {
		f : Fibonacci331 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate331 {
	when {
		f1 : Fibonacci331 f1.value != -1 {sequence : s1};
		f2 : Fibonacci331 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci331 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result331
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse332 {
	when {
		not(f : Fibonacci332 f.sequence == 1);
		f1 : Fibonacci332 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci332(f1.sequence - 1));
	}
}

rule Bootstrap332 {
	when {
		f : Fibonacci332 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate332 {
	when {
		f1 : Fibonacci332 f1.value != -1 {sequence : s1};
		f2 : Fibonacci332 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci332 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result332
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse333 {
	when {
		not(f : Fibonacci333 f.sequence == 1);
		f1 : Fibonacci333 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci333(f1.sequence - 1));
	}
}

rule Bootstrap333 {
	when {
		f : Fibonacci333 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate333 {
	when {
		f1 : Fibonacci333 f1.value != -1 {sequence : s1};
		f2 : Fibonacci333 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci333 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result333
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse334 {
	when {
		not(f : Fibonacci334 f.sequence == 1);
		f1 : Fibonacci334 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci334(f1.sequence - 1));
	}
}

rule Bootstrap334 {
	when {
		f : Fibonacci334 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate334 {
	when {
		f1 : Fibonacci334 f1.value != -1 {sequence : s1};
		f2 : Fibonacci334 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci334 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result334
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse335 {
	when {
		not(f : Fibonacci335 f.sequence == 1);
		f1 : Fibonacci335 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci335(f1.sequence - 1));
	}
}

rule Bootstrap335 {
	when {
		f : Fibonacci335 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate335 {
	when {
		f1 : Fibonacci335 f1.value != -1 {sequence : s1};
		f2 : Fibonacci335 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci335 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result335
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse336 {
	when {
		not(f : Fibonacci336 f.sequence == 1);
		f1 : Fibonacci336 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci336(f1.sequence - 1));
	}
}

rule Bootstrap336 {
	when {
		f : Fibonacci336 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate336 {
	when {
		f1 : Fibonacci336 f1.value != -1 {sequence : s1};
		f2 : Fibonacci336 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci336 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result336
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse337 {
	when {
		not(f : Fibonacci337 f.sequence == 1);
		f1 : Fibonacci337 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci337(f1.sequence - 1));
	}
}

rule Bootstrap337 {
	when {
		f : Fibonacci337 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate337 {
	when {
		f1 : Fibonacci337 f1.value != -1 {sequence : s1};
		f2 : Fibonacci337 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci337 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result337
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse338 {
	when {
		not(f : Fibonacci338 f.sequence == 1);
		f1 : Fibonacci338 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci338(f1.sequence - 1));
	}
}

rule Bootstrap338 {
	when {
		f : Fibonacci338 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate338 {
	when {
		f1 : Fibonacci338 f1.value != -1 {sequence : s1};
		f2 : Fibonacci338 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci338 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result338
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse339 {
	when {
		not(f : Fibonacci339 f.sequence == 1);
		f1 : Fibonacci339 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci339(f1.sequence - 1));
	}
}

rule Bootstrap339 {
	when {
		f : Fibonacci339 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate339 {
	when {
		f1 : Fibonacci339 f1.value != -1 {sequence : s1};
		f2 : Fibonacci339 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci339 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result339
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse340 {
	when {
		not(f : Fibonacci340 f.sequence == 1);
		f1 : Fibonacci340 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci340(f1.sequence - 1));
	}
}

rule Bootstrap340 {
	when {
		f : Fibonacci340 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate340 {
	when {
		f1 : Fibonacci340 f1.value != -1 {sequence : s1};
		f2 : Fibonacci340 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci340 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result340
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse341 {
	when {
		not(f : Fibonacci341 f.sequence == 1);
		f1 : Fibonacci341 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci341(f1.sequence - 1));
	}
}

rule Bootstrap341 {
	when {
		f : Fibonacci341 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate341 {
	when {
		f1 : Fibonacci341 f1.value != -1 {sequence : s1};
		f2 : Fibonacci341 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci341 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result341
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse342 {
	when {
		not(f : Fibonacci342 f.sequence == 1);
		f1 : Fibonacci342 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci342(f1.sequence - 1));
	}
}

rule Bootstrap342 {
	when {
		f : Fibonacci342 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate342 {
	when {
		f1 : Fibonacci342 f1.value != -1 {sequence : s1};
		f2 : Fibonacci342 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci342 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result342
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse343 {
	when {
		not(f : Fibonacci343 f.sequence == 1);
		f1 : Fibonacci343 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci343(f1.sequence - 1));
	}
}

rule Bootstrap343 {
	when {
		f : Fibonacci343 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate343 {
	when {
		f1 : Fibonacci343 f1.value != -1 {sequence : s1};
		f2 : Fibonacci343 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci343 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result343
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse344 {
	when {
		not(f : Fibonacci344 f.sequence == 1);
		f1 : Fibonacci344 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci344(f1.sequence - 1));
	}
}

rule Bootstrap344 {
	when {
		f : Fibonacci344 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate344 {
	when {
		f1 : Fibonacci344 f1.value != -1 {sequence : s1};
		f2 : Fibonacci344 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci344 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result344
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse345 {
	when {
		not(f : Fibonacci345 f.sequence == 1);
		f1 : Fibonacci345 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci345(f1.sequence - 1));
	}
}

rule Bootstrap345 {
	when {
		f : Fibonacci345 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate345 {
	when {
		f1 : Fibonacci345 f1.value != -1 {sequence : s1};
		f2 : Fibonacci345 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci345 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result345
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse346 {
	when {
		not(f : Fibonacci346 f.sequence == 1);
		f1 : Fibonacci346 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci346(f1.sequence - 1));
	}
}

rule Bootstrap346 {
	when {
		f : Fibonacci346 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate346 {
	when {
		f1 : Fibonacci346 f1.value != -1 {sequence : s1};
		f2 : Fibonacci346 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci346 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result346
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse347 {
	when {
		not(f : Fibonacci347 f.sequence == 1);
		f1 : Fibonacci347 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci347(f1.sequence - 1));
	}
}

rule Bootstrap347 {
	when {
		f : Fibonacci347 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate347 {
	when {
		f1 : Fibonacci347 f1.value != -1 {sequence : s1};
		f2 : Fibonacci347 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci347 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result347
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse348 {
	when {
		not(f : Fibonacci348 f.sequence == 1);
		f1 : Fibonacci348 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci348(f1.sequence - 1));
	}
}

rule Bootstrap348 {
	when {
		f : Fibonacci348 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate348 {
	when {
		f1 : Fibonacci348 f1.value != -1 {sequence : s1};
		f2 : Fibonacci348 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci348 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result348
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse349 {
	when {
		not(f : Fibonacci349 f.sequence == 1);
		f1 : Fibonacci349 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci349(f1.sequence - 1));
	}
}

rule Bootstrap349 {
	when {
		f : Fibonacci349 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate349 {
	when {
		f1 : Fibonacci349 f1.value != -1 {sequence : s1};
		f2 : Fibonacci349 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci349 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result349
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse350 {
	when {
		not(f : Fibonacci350 f.sequence == 1);
		f1 : Fibonacci350 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci350(f1.sequence - 1));
	}
}

rule Bootstrap350 {
	when {
		f : Fibonacci350 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate350 {
	when {
		f1 : Fibonacci350 f1.value != -1 {sequence : s1};
		f2 : Fibonacci350 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci350 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result350
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse351 {
	when {
		not(f : Fibonacci351 f.sequence == 1);
		f1 : Fibonacci351 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci351(f1.sequence - 1));
	}
}

rule Bootstrap351 {
	when {
		f : Fibonacci351 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate351 {
	when {
		f1 : Fibonacci351 f1.value != -1 {sequence : s1};
		f2 : Fibonacci351 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci351 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result351
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse352 {
	when {
		not(f : Fibonacci352 f.sequence == 1);
		f1 : Fibonacci352 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci352(f1.sequence - 1));
	}
}

rule Bootstrap352 {
	when {
		f : Fibonacci352 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate352 {
	when {
		f1 : Fibonacci352 f1.value != -1 {sequence : s1};
		f2 : Fibonacci352 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci352 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result352
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse353 {
	when {
		not(f : Fibonacci353 f.sequence == 1);
		f1 : Fibonacci353 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci353(f1.sequence - 1));
	}
}

rule Bootstrap353 {
	when {
		f : Fibonacci353 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate353 {
	when {
		f1 : Fibonacci353 f1.value != -1 {sequence : s1};
		f2 : Fibonacci353 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci353 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result353
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse354 {
	when {
		not(f : Fibonacci354 f.sequence == 1);
		f1 : Fibonacci354 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci354(f1.sequence - 1));
	}
}

rule Bootstrap354 {
	when {
		f : Fibonacci354 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate354 {
	when {
		f1 : Fibonacci354 f1.value != -1 {sequence : s1};
		f2 : Fibonacci354 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci354 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result354
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse355 {
	when {
		not(f : Fibonacci355 f.sequence == 1);
		f1 : Fibonacci355 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci355(f1.sequence - 1));
	}
}

rule Bootstrap355 {
	when {
		f : Fibonacci355 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate355 {
	when {
		f1 : Fibonacci355 f1.value != -1 {sequence : s1};
		f2 : Fibonacci355 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci355 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result355
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse356 {
	when {
		not(f : Fibonacci356 f.sequence == 1);
		f1 : Fibonacci356 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci356(f1.sequence - 1));
	}
}

rule Bootstrap356 {
	when {
		f : Fibonacci356 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate356 {
	when {
		f1 : Fibonacci356 f1.value != -1 {sequence : s1};
		f2 : Fibonacci356 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci356 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result356
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse357 {
	when {
		not(f : Fibonacci357 f.sequence == 1);
		f1 : Fibonacci357 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci357(f1.sequence - 1));
	}
}

rule Bootstrap357 {
	when {
		f : Fibonacci357 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate357 {
	when {
		f1 : Fibonacci357 f1.value != -1 {sequence : s1};
		f2 : Fibonacci357 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci357 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result357
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse358 {
	when {
		not(f : Fibonacci358 f.sequence == 1);
		f1 : Fibonacci358 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci358(f1.sequence - 1));
	}
}

rule Bootstrap358 {
	when {
		f : Fibonacci358 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate358 {
	when {
		f1 : Fibonacci358 f1.value != -1 {sequence : s1};
		f2 : Fibonacci358 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci358 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result358
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse359 {
	when {
		not(f : Fibonacci359 f.sequence == 1);
		f1 : Fibonacci359 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci359(f1.sequence - 1));
	}
}

rule Bootstrap359 {
	when {
		f : Fibonacci359 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate359 {
	when {
		f1 : Fibonacci359 f1.value != -1 {sequence : s1};
		f2 : Fibonacci359 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci359 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result359
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse360 {
	when {
		not(f : Fibonacci360 f.sequence == 1);
		f1 : Fibonacci360 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci360(f1.sequence - 1));
	}
}

rule Bootstrap360 {
	when {
		f : Fibonacci360 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate360 {
	when {
		f1 : Fibonacci360 f1.value != -1 {sequence : s1};
		f2 : Fibonacci360 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci360 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result360
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse361 {
	when {
		not(f : Fibonacci361 f.sequence == 1);
		f1 : Fibonacci361 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci361(f1.sequence - 1));
	}
}

rule Bootstrap361 {
	when {
		f : Fibonacci361 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate361 {
	when {
		f1 : Fibonacci361 f1.value != -1 {sequence : s1};
		f2 : Fibonacci361 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci361 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result361
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse362 {
	when {
		not(f : Fibonacci362 f.sequence == 1);
		f1 : Fibonacci362 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci362(f1.sequence - 1));
	}
}

rule Bootstrap362 {
	when {
		f : Fibonacci362 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate362 {
	when {
		f1 : Fibonacci362 f1.value != -1 {sequence : s1};
		f2 : Fibonacci362 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci362 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result362
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse363 {
	when {
		not(f : Fibonacci363 f.sequence == 1);
		f1 : Fibonacci363 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci363(f1.sequence - 1));
	}
}

rule Bootstrap363 {
	when {
		f : Fibonacci363 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate363 {
	when {
		f1 : Fibonacci363 f1.value != -1 {sequence : s1};
		f2 : Fibonacci363 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci363 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result363
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse364 {
	when {
		not(f : Fibonacci364 f.sequence == 1);
		f1 : Fibonacci364 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci364(f1.sequence - 1));
	}
}

rule Bootstrap364 {
	when {
		f : Fibonacci364 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate364 {
	when {
		f1 : Fibonacci364 f1.value != -1 {sequence : s1};
		f2 : Fibonacci364 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci364 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result364
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse365 {
	when {
		not(f : Fibonacci365 f.sequence == 1);
		f1 : Fibonacci365 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci365(f1.sequence - 1));
	}
}

rule Bootstrap365 {
	when {
		f : Fibonacci365 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate365 {
	when {
		f1 : Fibonacci365 f1.value != -1 {sequence : s1};
		f2 : Fibonacci365 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci365 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result365
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse366 {
	when {
		not(f : Fibonacci366 f.sequence == 1);
		f1 : Fibonacci366 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci366(f1.sequence - 1));
	}
}

rule Bootstrap366 {
	when {
		f : Fibonacci366 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate366 {
	when {
		f1 : Fibonacci366 f1.value != -1 {sequence : s1};
		f2 : Fibonacci366 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci366 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result366
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse367 {
	when {
		not(f : Fibonacci367 f.sequence == 1);
		f1 : Fibonacci367 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci367(f1.sequence - 1));
	}
}

rule Bootstrap367 {
	when {
		f : Fibonacci367 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate367 {
	when {
		f1 : Fibonacci367 f1.value != -1 {sequence : s1};
		f2 : Fibonacci367 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci367 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result367
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse368 {
	when {
		not(f : Fibonacci368 f.sequence == 1);
		f1 : Fibonacci368 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci368(f1.sequence - 1));
	}
}

rule Bootstrap368 {
	when {
		f : Fibonacci368 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate368 {
	when {
		f1 : Fibonacci368 f1.value != -1 {sequence : s1};
		f2 : Fibonacci368 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci368 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result368
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse369 {
	when {
		not(f : Fibonacci369 f.sequence == 1);
		f1 : Fibonacci369 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci369(f1.sequence - 1));
	}
}

rule Bootstrap369 {
	when {
		f : Fibonacci369 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate369 {
	when {
		f1 : Fibonacci369 f1.value != -1 {sequence : s1};
		f2 : Fibonacci369 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci369 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result369
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse370 {
	when {
		not(f : Fibonacci370 f.sequence == 1);
		f1 : Fibonacci370 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci370(f1.sequence - 1));
	}
}

rule Bootstrap370 {
	when {
		f : Fibonacci370 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate370 {
	when {
		f1 : Fibonacci370 f1.value != -1 {sequence : s1};
		f2 : Fibonacci370 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci370 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result370
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse371 {
	when {
		not(f : Fibonacci371 f.sequence == 1);
		f1 : Fibonacci371 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci371(f1.sequence - 1));
	}
}

rule Bootstrap371 {
	when {
		f : Fibonacci371 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate371 {
	when {
		f1 : Fibonacci371 f1.value != -1 {sequence : s1};
		f2 : Fibonacci371 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci371 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result371
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse372 {
	when {
		not(f : Fibonacci372 f.sequence == 1);
		f1 : Fibonacci372 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci372(f1.sequence - 1));
	}
}

rule Bootstrap372 {
	when {
		f : Fibonacci372 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate372 {
	when {
		f1 : Fibonacci372 f1.value != -1 {sequence : s1};
		f2 : Fibonacci372 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci372 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result372
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse373 {
	when {
		not(f : Fibonacci373 f.sequence == 1);
		f1 : Fibonacci373 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci373(f1.sequence - 1));
	}
}

rule Bootstrap373 {
	when {
		f : Fibonacci373 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate373 {
	when {
		f1 : Fibonacci373 f1.value != -1 {sequence : s1};
		f2 : Fibonacci373 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci373 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result373
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse374 {
	when {
		not(f : Fibonacci374 f.sequence == 1);
		f1 : Fibonacci374 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci374(f1.sequence - 1));
	}
}

rule Bootstrap374 {
	when {
		f : Fibonacci374 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate374 {
	when {
		f1 : Fibonacci374 f1.value != -1 {sequence : s1};
		f2 : Fibonacci374 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci374 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result374
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse375 {
	when {
		not(f : Fibonacci375 f.sequence == 1);
		f1 : Fibonacci375 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci375(f1.sequence - 1));
	}
}

rule Bootstrap375 {
	when {
		f : Fibonacci375 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate375 {
	when {
		f1 : Fibonacci375 f1.value != -1 {sequence : s1};
		f2 : Fibonacci375 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci375 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result375
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse376 {
	when {
		not(f : Fibonacci376 f.sequence == 1);
		f1 : Fibonacci376 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci376(f1.sequence - 1));
	}
}

rule Bootstrap376 {
	when {
		f : Fibonacci376 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate376 {
	when {
		f1 : Fibonacci376 f1.value != -1 {sequence : s1};
		f2 : Fibonacci376 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci376 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result376
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse377 {
	when {
		not(f : Fibonacci377 f.sequence == 1);
		f1 : Fibonacci377 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci377(f1.sequence - 1));
	}
}

rule Bootstrap377 {
	when {
		f : Fibonacci377 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate377 {
	when {
		f1 : Fibonacci377 f1.value != -1 {sequence : s1};
		f2 : Fibonacci377 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci377 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result377
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse378 {
	when {
		not(f : Fibonacci378 f.sequence == 1);
		f1 : Fibonacci378 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci378(f1.sequence - 1));
	}
}

rule Bootstrap378 {
	when {
		f : Fibonacci378 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate378 {
	when {
		f1 : Fibonacci378 f1.value != -1 {sequence : s1};
		f2 : Fibonacci378 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci378 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result378
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse379 {
	when {
		not(f : Fibonacci379 f.sequence == 1);
		f1 : Fibonacci379 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci379(f1.sequence - 1));
	}
}

rule Bootstrap379 {
	when {
		f : Fibonacci379 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate379 {
	when {
		f1 : Fibonacci379 f1.value != -1 {sequence : s1};
		f2 : Fibonacci379 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci379 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result379
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse380 {
	when {
		not(f : Fibonacci380 f.sequence == 1);
		f1 : Fibonacci380 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci380(f1.sequence - 1));
	}
}

rule Bootstrap380 {
	when {
		f : Fibonacci380 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate380 {
	when {
		f1 : Fibonacci380 f1.value != -1 {sequence : s1};
		f2 : Fibonacci380 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci380 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result380
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse381 {
	when {
		not(f : Fibonacci381 f.sequence == 1);
		f1 : Fibonacci381 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci381(f1.sequence - 1));
	}
}

rule Bootstrap381 {
	when {
		f : Fibonacci381 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate381 {
	when {
		f1 : Fibonacci381 f1.value != -1 {sequence : s1};
		f2 : Fibonacci381 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci381 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result381
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse382 {
	when {
		not(f : Fibonacci382 f.sequence == 1);
		f1 : Fibonacci382 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci382(f1.sequence - 1));
	}
}

rule Bootstrap382 {
	when {
		f : Fibonacci382 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate382 {
	when {
		f1 : Fibonacci382 f1.value != -1 {sequence : s1};
		f2 : Fibonacci382 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci382 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result382
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse383 {
	when {
		not(f : Fibonacci383 f.sequence == 1);
		f1 : Fibonacci383 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci383(f1.sequence - 1));
	}
}

rule Bootstrap383 {
	when {
		f : Fibonacci383 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate383 {
	when {
		f1 : Fibonacci383 f1.value != -1 {sequence : s1};
		f2 : Fibonacci383 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci383 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result383
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse384 {
	when {
		not(f : Fibonacci384 f.sequence == 1);
		f1 : Fibonacci384 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci384(f1.sequence - 1));
	}
}

rule Bootstrap384 {
	when {
		f : Fibonacci384 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate384 {
	when {
		f1 : Fibonacci384 f1.value != -1 {sequence : s1};
		f2 : Fibonacci384 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci384 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result384
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse385 {
	when {
		not(f : Fibonacci385 f.sequence == 1);
		f1 : Fibonacci385 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci385(f1.sequence - 1));
	}
}

rule Bootstrap385 {
	when {
		f : Fibonacci385 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate385 {
	when {
		f1 : Fibonacci385 f1.value != -1 {sequence : s1};
		f2 : Fibonacci385 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci385 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result385
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse386 {
	when {
		not(f : Fibonacci386 f.sequence == 1);
		f1 : Fibonacci386 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci386(f1.sequence - 1));
	}
}

rule Bootstrap386 {
	when {
		f : Fibonacci386 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate386 {
	when {
		f1 : Fibonacci386 f1.value != -1 {sequence : s1};
		f2 : Fibonacci386 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci386 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result386
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse387 {
	when {
		not(f : Fibonacci387 f.sequence == 1);
		f1 : Fibonacci387 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci387(f1.sequence - 1));
	}
}

rule Bootstrap387 {
	when {
		f : Fibonacci387 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate387 {
	when {
		f1 : Fibonacci387 f1.value != -1 {sequence : s1};
		f2 : Fibonacci387 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci387 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result387
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse388 {
	when {
		not(f : Fibonacci388 f.sequence == 1);
		f1 : Fibonacci388 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci388(f1.sequence - 1));
	}
}

rule Bootstrap388 {
	when {
		f : Fibonacci388 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate388 {
	when {
		f1 : Fibonacci388 f1.value != -1 {sequence : s1};
		f2 : Fibonacci388 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci388 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result388
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse389 {
	when {
		not(f : Fibonacci389 f.sequence == 1);
		f1 : Fibonacci389 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci389(f1.sequence - 1));
	}
}

rule Bootstrap389 {
	when {
		f : Fibonacci389 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate389 {
	when {
		f1 : Fibonacci389 f1.value != -1 {sequence : s1};
		f2 : Fibonacci389 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci389 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result389
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse390 {
	when {
		not(f : Fibonacci390 f.sequence == 1);
		f1 : Fibonacci390 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci390(f1.sequence - 1));
	}
}

rule Bootstrap390 {
	when {
		f : Fibonacci390 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate390 {
	when {
		f1 : Fibonacci390 f1.value != -1 {sequence : s1};
		f2 : Fibonacci390 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci390 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result390
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse391 {
	when {
		not(f : Fibonacci391 f.sequence == 1);
		f1 : Fibonacci391 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci391(f1.sequence - 1));
	}
}

rule Bootstrap391 {
	when {
		f : Fibonacci391 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate391 {
	when {
		f1 : Fibonacci391 f1.value != -1 {sequence : s1};
		f2 : Fibonacci391 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci391 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result391
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse392 {
	when {
		not(f : Fibonacci392 f.sequence == 1);
		f1 : Fibonacci392 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci392(f1.sequence - 1));
	}
}

rule Bootstrap392 {
	when {
		f : Fibonacci392 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate392 {
	when {
		f1 : Fibonacci392 f1.value != -1 {sequence : s1};
		f2 : Fibonacci392 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci392 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result392
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse393 {
	when {
		not(f : Fibonacci393 f.sequence == 1);
		f1 : Fibonacci393 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci393(f1.sequence - 1));
	}
}

rule Bootstrap393 {
	when {
		f : Fibonacci393 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate393 {
	when {
		f1 : Fibonacci393 f1.value != -1 {sequence : s1};
		f2 : Fibonacci393 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci393 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result393
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse394 {
	when {
		not(f : Fibonacci394 f.sequence == 1);
		f1 : Fibonacci394 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci394(f1.sequence - 1));
	}
}

rule Bootstrap394 {
	when {
		f : Fibonacci394 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate394 {
	when {
		f1 : Fibonacci394 f1.value != -1 {sequence : s1};
		f2 : Fibonacci394 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci394 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result394
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse395 {
	when {
		not(f : Fibonacci395 f.sequence == 1);
		f1 : Fibonacci395 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci395(f1.sequence - 1));
	}
}

rule Bootstrap395 {
	when {
		f : Fibonacci395 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate395 {
	when {
		f1 : Fibonacci395 f1.value != -1 {sequence : s1};
		f2 : Fibonacci395 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci395 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result395
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse396 {
	when {
		not(f : Fibonacci396 f.sequence == 1);
		f1 : Fibonacci396 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci396(f1.sequence - 1));
	}
}

rule Bootstrap396 {
	when {
		f : Fibonacci396 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate396 {
	when {
		f1 : Fibonacci396 f1.value != -1 {sequence : s1};
		f2 : Fibonacci396 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci396 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result396
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse397 {
	when {
		not(f : Fibonacci397 f.sequence == 1);
		f1 : Fibonacci397 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci397(f1.sequence - 1));
	}
}

rule Bootstrap397 {
	when {
		f : Fibonacci397 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate397 {
	when {
		f1 : Fibonacci397 f1.value != -1 {sequence : s1};
		f2 : Fibonacci397 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci397 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result397
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse398 {
	when {
		not(f : Fibonacci398 f.sequence == 1);
		f1 : Fibonacci398 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci398(f1.sequence - 1));
	}
}

rule Bootstrap398 {
	when {
		f : Fibonacci398 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate398 {
	when {
		f1 : Fibonacci398 f1.value != -1 {sequence : s1};
		f2 : Fibonacci398 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci398 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result398
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse399 {
	when {
		not(f : Fibonacci399 f.sequence == 1);
		f1 : Fibonacci399 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci399(f1.sequence - 1));
	}
}

rule Bootstrap399 {
	when {
		f : Fibonacci399 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate399 {
	when {
		f1 : Fibonacci399 f1.value != -1 {sequence : s1};
		f2 : Fibonacci399 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci399 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result399
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse400 {
	when {
		not(f : Fibonacci400 f.sequence == 1);
		f1 : Fibonacci400 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci400(f1.sequence - 1));
	}
}

rule Bootstrap400 {
	when {
		f : Fibonacci400 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate400 {
	when {
		f1 : Fibonacci400 f1.value != -1 {sequence : s1};
		f2 : Fibonacci400 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci400 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result400
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse401 {
	when {
		not(f : Fibonacci401 f.sequence == 1);
		f1 : Fibonacci401 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci401(f1.sequence - 1));
	}
}

rule Bootstrap401 {
	when {
		f : Fibonacci401 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate401 {
	when {
		f1 : Fibonacci401 f1.value != -1 {sequence : s1};
		f2 : Fibonacci401 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci401 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result401
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse402 {
	when {
		not(f : Fibonacci402 f.sequence == 1);
		f1 : Fibonacci402 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci402(f1.sequence - 1));
	}
}

rule Bootstrap402 {
	when {
		f : Fibonacci402 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate402 {
	when {
		f1 : Fibonacci402 f1.value != -1 {sequence : s1};
		f2 : Fibonacci402 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci402 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result402
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse403 {
	when {
		not(f : Fibonacci403 f.sequence == 1);
		f1 : Fibonacci403 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci403(f1.sequence - 1));
	}
}

rule Bootstrap403 {
	when {
		f : Fibonacci403 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate403 {
	when {
		f1 : Fibonacci403 f1.value != -1 {sequence : s1};
		f2 : Fibonacci403 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci403 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result403
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse404 {
	when {
		not(f : Fibonacci404 f.sequence == 1);
		f1 : Fibonacci404 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci404(f1.sequence - 1));
	}
}

rule Bootstrap404 {
	when {
		f : Fibonacci404 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate404 {
	when {
		f1 : Fibonacci404 f1.value != -1 {sequence : s1};
		f2 : Fibonacci404 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci404 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result404
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse405 {
	when {
		not(f : Fibonacci405 f.sequence == 1);
		f1 : Fibonacci405 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci405(f1.sequence - 1));
	}
}

rule Bootstrap405 {
	when {
		f : Fibonacci405 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate405 {
	when {
		f1 : Fibonacci405 f1.value != -1 {sequence : s1};
		f2 : Fibonacci405 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci405 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result405
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse406 {
	when {
		not(f : Fibonacci406 f.sequence == 1);
		f1 : Fibonacci406 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci406(f1.sequence - 1));
	}
}

rule Bootstrap406 {
	when {
		f : Fibonacci406 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate406 {
	when {
		f1 : Fibonacci406 f1.value != -1 {sequence : s1};
		f2 : Fibonacci406 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci406 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result406
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse407 {
	when {
		not(f : Fibonacci407 f.sequence == 1);
		f1 : Fibonacci407 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci407(f1.sequence - 1));
	}
}

rule Bootstrap407 {
	when {
		f : Fibonacci407 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate407 {
	when {
		f1 : Fibonacci407 f1.value != -1 {sequence : s1};
		f2 : Fibonacci407 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci407 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result407
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse408 {
	when {
		not(f : Fibonacci408 f.sequence == 1);
		f1 : Fibonacci408 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci408(f1.sequence - 1));
	}
}

rule Bootstrap408 {
	when {
		f : Fibonacci408 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate408 {
	when {
		f1 : Fibonacci408 f1.value != -1 {sequence : s1};
		f2 : Fibonacci408 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci408 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result408
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse409 {
	when {
		not(f : Fibonacci409 f.sequence == 1);
		f1 : Fibonacci409 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci409(f1.sequence - 1));
	}
}

rule Bootstrap409 {
	when {
		f : Fibonacci409 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate409 {
	when {
		f1 : Fibonacci409 f1.value != -1 {sequence : s1};
		f2 : Fibonacci409 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci409 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result409
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse410 {
	when {
		not(f : Fibonacci410 f.sequence == 1);
		f1 : Fibonacci410 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci410(f1.sequence - 1));
	}
}

rule Bootstrap410 {
	when {
		f : Fibonacci410 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate410 {
	when {
		f1 : Fibonacci410 f1.value != -1 {sequence : s1};
		f2 : Fibonacci410 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci410 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result410
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse411 {
	when {
		not(f : Fibonacci411 f.sequence == 1);
		f1 : Fibonacci411 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci411(f1.sequence - 1));
	}
}

rule Bootstrap411 {
	when {
		f : Fibonacci411 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate411 {
	when {
		f1 : Fibonacci411 f1.value != -1 {sequence : s1};
		f2 : Fibonacci411 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci411 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result411
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse412 {
	when {
		not(f : Fibonacci412 f.sequence == 1);
		f1 : Fibonacci412 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci412(f1.sequence - 1));
	}
}

rule Bootstrap412 {
	when {
		f : Fibonacci412 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate412 {
	when {
		f1 : Fibonacci412 f1.value != -1 {sequence : s1};
		f2 : Fibonacci412 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci412 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result412
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse413 {
	when {
		not(f : Fibonacci413 f.sequence == 1);
		f1 : Fibonacci413 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci413(f1.sequence - 1));
	}
}

rule Bootstrap413 {
	when {
		f : Fibonacci413 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate413 {
	when {
		f1 : Fibonacci413 f1.value != -1 {sequence : s1};
		f2 : Fibonacci413 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci413 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result413
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse414 {
	when {
		not(f : Fibonacci414 f.sequence == 1);
		f1 : Fibonacci414 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci414(f1.sequence - 1));
	}
}

rule Bootstrap414 {
	when {
		f : Fibonacci414 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate414 {
	when {
		f1 : Fibonacci414 f1.value != -1 {sequence : s1};
		f2 : Fibonacci414 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci414 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result414
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse415 {
	when {
		not(f : Fibonacci415 f.sequence == 1);
		f1 : Fibonacci415 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci415(f1.sequence - 1));
	}
}

rule Bootstrap415 {
	when {
		f : Fibonacci415 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate415 {
	when {
		f1 : Fibonacci415 f1.value != -1 {sequence : s1};
		f2 : Fibonacci415 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci415 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result415
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse416 {
	when {
		not(f : Fibonacci416 f.sequence == 1);
		f1 : Fibonacci416 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci416(f1.sequence - 1));
	}
}

rule Bootstrap416 {
	when {
		f : Fibonacci416 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate416 {
	when {
		f1 : Fibonacci416 f1.value != -1 {sequence : s1};
		f2 : Fibonacci416 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci416 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result416
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse417 {
	when {
		not(f : Fibonacci417 f.sequence == 1);
		f1 : Fibonacci417 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci417(f1.sequence - 1));
	}
}

rule Bootstrap417 {
	when {
		f : Fibonacci417 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate417 {
	when {
		f1 : Fibonacci417 f1.value != -1 {sequence : s1};
		f2 : Fibonacci417 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci417 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result417
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse418 {
	when {
		not(f : Fibonacci418 f.sequence == 1);
		f1 : Fibonacci418 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci418(f1.sequence - 1));
	}
}

rule Bootstrap418 {
	when {
		f : Fibonacci418 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate418 {
	when {
		f1 : Fibonacci418 f1.value != -1 {sequence : s1};
		f2 : Fibonacci418 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci418 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result418
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse419 {
	when {
		not(f : Fibonacci419 f.sequence == 1);
		f1 : Fibonacci419 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci419(f1.sequence - 1));
	}
}

rule Bootstrap419 {
	when {
		f : Fibonacci419 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate419 {
	when {
		f1 : Fibonacci419 f1.value != -1 {sequence : s1};
		f2 : Fibonacci419 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci419 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result419
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse420 {
	when {
		not(f : Fibonacci420 f.sequence == 1);
		f1 : Fibonacci420 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci420(f1.sequence - 1));
	}
}

rule Bootstrap420 {
	when {
		f : Fibonacci420 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate420 {
	when {
		f1 : Fibonacci420 f1.value != -1 {sequence : s1};
		f2 : Fibonacci420 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci420 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result420
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse421 {
	when {
		not(f : Fibonacci421 f.sequence == 1);
		f1 : Fibonacci421 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci421(f1.sequence - 1));
	}
}

rule Bootstrap421 {
	when {
		f : Fibonacci421 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate421 {
	when {
		f1 : Fibonacci421 f1.value != -1 {sequence : s1};
		f2 : Fibonacci421 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci421 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result421
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse422 {
	when {
		not(f : Fibonacci422 f.sequence == 1);
		f1 : Fibonacci422 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci422(f1.sequence - 1));
	}
}

rule Bootstrap422 {
	when {
		f : Fibonacci422 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate422 {
	when {
		f1 : Fibonacci422 f1.value != -1 {sequence : s1};
		f2 : Fibonacci422 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci422 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result422
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse423 {
	when {
		not(f : Fibonacci423 f.sequence == 1);
		f1 : Fibonacci423 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci423(f1.sequence - 1));
	}
}

rule Bootstrap423 {
	when {
		f : Fibonacci423 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate423 {
	when {
		f1 : Fibonacci423 f1.value != -1 {sequence : s1};
		f2 : Fibonacci423 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci423 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result423
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse424 {
	when {
		not(f : Fibonacci424 f.sequence == 1);
		f1 : Fibonacci424 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci424(f1.sequence - 1));
	}
}

rule Bootstrap424 {
	when {
		f : Fibonacci424 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate424 {
	when {
		f1 : Fibonacci424 f1.value != -1 {sequence : s1};
		f2 : Fibonacci424 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci424 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result424
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse425 {
	when {
		not(f : Fibonacci425 f.sequence == 1);
		f1 : Fibonacci425 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci425(f1.sequence - 1));
	}
}

rule Bootstrap425 {
	when {
		f : Fibonacci425 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate425 {
	when {
		f1 : Fibonacci425 f1.value != -1 {sequence : s1};
		f2 : Fibonacci425 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci425 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result425
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse426 {
	when {
		not(f : Fibonacci426 f.sequence == 1);
		f1 : Fibonacci426 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci426(f1.sequence - 1));
	}
}

rule Bootstrap426 {
	when {
		f : Fibonacci426 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate426 {
	when {
		f1 : Fibonacci426 f1.value != -1 {sequence : s1};
		f2 : Fibonacci426 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci426 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result426
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse427 {
	when {
		not(f : Fibonacci427 f.sequence == 1);
		f1 : Fibonacci427 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci427(f1.sequence - 1));
	}
}

rule Bootstrap427 {
	when {
		f : Fibonacci427 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate427 {
	when {
		f1 : Fibonacci427 f1.value != -1 {sequence : s1};
		f2 : Fibonacci427 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci427 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result427
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse428 {
	when {
		not(f : Fibonacci428 f.sequence == 1);
		f1 : Fibonacci428 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci428(f1.sequence - 1));
	}
}

rule Bootstrap428 {
	when {
		f : Fibonacci428 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate428 {
	when {
		f1 : Fibonacci428 f1.value != -1 {sequence : s1};
		f2 : Fibonacci428 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci428 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result428
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse429 {
	when {
		not(f : Fibonacci429 f.sequence == 1);
		f1 : Fibonacci429 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci429(f1.sequence - 1));
	}
}

rule Bootstrap429 {
	when {
		f : Fibonacci429 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate429 {
	when {
		f1 : Fibonacci429 f1.value != -1 {sequence : s1};
		f2 : Fibonacci429 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci429 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result429
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse430 {
	when {
		not(f : Fibonacci430 f.sequence == 1);
		f1 : Fibonacci430 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci430(f1.sequence - 1));
	}
}

rule Bootstrap430 {
	when {
		f : Fibonacci430 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate430 {
	when {
		f1 : Fibonacci430 f1.value != -1 {sequence : s1};
		f2 : Fibonacci430 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci430 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result430
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse431 {
	when {
		not(f : Fibonacci431 f.sequence == 1);
		f1 : Fibonacci431 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci431(f1.sequence - 1));
	}
}

rule Bootstrap431 {
	when {
		f : Fibonacci431 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate431 {
	when {
		f1 : Fibonacci431 f1.value != -1 {sequence : s1};
		f2 : Fibonacci431 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci431 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result431
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse432 {
	when {
		not(f : Fibonacci432 f.sequence == 1);
		f1 : Fibonacci432 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci432(f1.sequence - 1));
	}
}

rule Bootstrap432 {
	when {
		f : Fibonacci432 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate432 {
	when {
		f1 : Fibonacci432 f1.value != -1 {sequence : s1};
		f2 : Fibonacci432 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci432 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result432
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse433 {
	when {
		not(f : Fibonacci433 f.sequence == 1);
		f1 : Fibonacci433 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci433(f1.sequence - 1));
	}
}

rule Bootstrap433 {
	when {
		f : Fibonacci433 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate433 {
	when {
		f1 : Fibonacci433 f1.value != -1 {sequence : s1};
		f2 : Fibonacci433 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci433 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result433
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse434 {
	when {
		not(f : Fibonacci434 f.sequence == 1);
		f1 : Fibonacci434 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci434(f1.sequence - 1));
	}
}

rule Bootstrap434 {
	when {
		f : Fibonacci434 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate434 {
	when {
		f1 : Fibonacci434 f1.value != -1 {sequence : s1};
		f2 : Fibonacci434 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci434 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result434
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse435 {
	when {
		not(f : Fibonacci435 f.sequence == 1);
		f1 : Fibonacci435 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci435(f1.sequence - 1));
	}
}

rule Bootstrap435 {
	when {
		f : Fibonacci435 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate435 {
	when {
		f1 : Fibonacci435 f1.value != -1 {sequence : s1};
		f2 : Fibonacci435 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci435 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result435
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse436 {
	when {
		not(f : Fibonacci436 f.sequence == 1);
		f1 : Fibonacci436 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci436(f1.sequence - 1));
	}
}

rule Bootstrap436 {
	when {
		f : Fibonacci436 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate436 {
	when {
		f1 : Fibonacci436 f1.value != -1 {sequence : s1};
		f2 : Fibonacci436 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci436 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result436
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse437 {
	when {
		not(f : Fibonacci437 f.sequence == 1);
		f1 : Fibonacci437 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci437(f1.sequence - 1));
	}
}

rule Bootstrap437 {
	when {
		f : Fibonacci437 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate437 {
	when {
		f1 : Fibonacci437 f1.value != -1 {sequence : s1};
		f2 : Fibonacci437 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci437 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result437
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse438 {
	when {
		not(f : Fibonacci438 f.sequence == 1);
		f1 : Fibonacci438 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci438(f1.sequence - 1));
	}
}

rule Bootstrap438 {
	when {
		f : Fibonacci438 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate438 {
	when {
		f1 : Fibonacci438 f1.value != -1 {sequence : s1};
		f2 : Fibonacci438 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci438 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result438
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse439 {
	when {
		not(f : Fibonacci439 f.sequence == 1);
		f1 : Fibonacci439 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci439(f1.sequence - 1));
	}
}

rule Bootstrap439 {
	when {
		f : Fibonacci439 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate439 {
	when {
		f1 : Fibonacci439 f1.value != -1 {sequence : s1};
		f2 : Fibonacci439 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci439 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result439
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse440 {
	when {
		not(f : Fibonacci440 f.sequence == 1);
		f1 : Fibonacci440 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci440(f1.sequence - 1));
	}
}

rule Bootstrap440 {
	when {
		f : Fibonacci440 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate440 {
	when {
		f1 : Fibonacci440 f1.value != -1 {sequence : s1};
		f2 : Fibonacci440 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci440 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result440
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse441 {
	when {
		not(f : Fibonacci441 f.sequence == 1);
		f1 : Fibonacci441 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci441(f1.sequence - 1));
	}
}

rule Bootstrap441 {
	when {
		f : Fibonacci441 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate441 {
	when {
		f1 : Fibonacci441 f1.value != -1 {sequence : s1};
		f2 : Fibonacci441 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci441 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result441
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse442 {
	when {
		not(f : Fibonacci442 f.sequence == 1);
		f1 : Fibonacci442 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci442(f1.sequence - 1));
	}
}

rule Bootstrap442 {
	when {
		f : Fibonacci442 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate442 {
	when {
		f1 : Fibonacci442 f1.value != -1 {sequence : s1};
		f2 : Fibonacci442 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci442 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result442
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse443 {
	when {
		not(f : Fibonacci443 f.sequence == 1);
		f1 : Fibonacci443 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci443(f1.sequence - 1));
	}
}

rule Bootstrap443 {
	when {
		f : Fibonacci443 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate443 {
	when {
		f1 : Fibonacci443 f1.value != -1 {sequence : s1};
		f2 : Fibonacci443 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci443 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result443
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse444 {
	when {
		not(f : Fibonacci444 f.sequence == 1);
		f1 : Fibonacci444 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci444(f1.sequence - 1));
	}
}

rule Bootstrap444 {
	when {
		f : Fibonacci444 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate444 {
	when {
		f1 : Fibonacci444 f1.value != -1 {sequence : s1};
		f2 : Fibonacci444 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci444 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result444
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse445 {
	when {
		not(f : Fibonacci445 f.sequence == 1);
		f1 : Fibonacci445 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci445(f1.sequence - 1));
	}
}

rule Bootstrap445 {
	when {
		f : Fibonacci445 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate445 {
	when {
		f1 : Fibonacci445 f1.value != -1 {sequence : s1};
		f2 : Fibonacci445 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci445 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result445
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse446 {
	when {
		not(f : Fibonacci446 f.sequence == 1);
		f1 : Fibonacci446 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci446(f1.sequence - 1));
	}
}

rule Bootstrap446 {
	when {
		f : Fibonacci446 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate446 {
	when {
		f1 : Fibonacci446 f1.value != -1 {sequence : s1};
		f2 : Fibonacci446 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci446 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result446
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse447 {
	when {
		not(f : Fibonacci447 f.sequence == 1);
		f1 : Fibonacci447 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci447(f1.sequence - 1));
	}
}

rule Bootstrap447 {
	when {
		f : Fibonacci447 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate447 {
	when {
		f1 : Fibonacci447 f1.value != -1 {sequence : s1};
		f2 : Fibonacci447 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci447 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result447
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse448 {
	when {
		not(f : Fibonacci448 f.sequence == 1);
		f1 : Fibonacci448 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci448(f1.sequence - 1));
	}
}

rule Bootstrap448 {
	when {
		f : Fibonacci448 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate448 {
	when {
		f1 : Fibonacci448 f1.value != -1 {sequence : s1};
		f2 : Fibonacci448 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci448 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result448
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse449 {
	when {
		not(f : Fibonacci449 f.sequence == 1);
		f1 : Fibonacci449 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci449(f1.sequence - 1));
	}
}

rule Bootstrap449 {
	when {
		f : Fibonacci449 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate449 {
	when {
		f1 : Fibonacci449 f1.value != -1 {sequence : s1};
		f2 : Fibonacci449 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci449 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result449
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse450 {
	when {
		not(f : Fibonacci450 f.sequence == 1);
		f1 : Fibonacci450 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci450(f1.sequence - 1));
	}
}

rule Bootstrap450 {
	when {
		f : Fibonacci450 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate450 {
	when {
		f1 : Fibonacci450 f1.value != -1 {sequence : s1};
		f2 : Fibonacci450 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci450 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result450
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse451 {
	when {
		not(f : Fibonacci451 f.sequence == 1);
		f1 : Fibonacci451 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci451(f1.sequence - 1));
	}
}

rule Bootstrap451 {
	when {
		f : Fibonacci451 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate451 {
	when {
		f1 : Fibonacci451 f1.value != -1 {sequence : s1};
		f2 : Fibonacci451 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci451 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result451
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse452 {
	when {
		not(f : Fibonacci452 f.sequence == 1);
		f1 : Fibonacci452 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci452(f1.sequence - 1));
	}
}

rule Bootstrap452 {
	when {
		f : Fibonacci452 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate452 {
	when {
		f1 : Fibonacci452 f1.value != -1 {sequence : s1};
		f2 : Fibonacci452 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci452 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result452
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse453 {
	when {
		not(f : Fibonacci453 f.sequence == 1);
		f1 : Fibonacci453 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci453(f1.sequence - 1));
	}
}

rule Bootstrap453 {
	when {
		f : Fibonacci453 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate453 {
	when {
		f1 : Fibonacci453 f1.value != -1 {sequence : s1};
		f2 : Fibonacci453 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci453 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result453
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse454 {
	when {
		not(f : Fibonacci454 f.sequence == 1);
		f1 : Fibonacci454 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci454(f1.sequence - 1));
	}
}

rule Bootstrap454 {
	when {
		f : Fibonacci454 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate454 {
	when {
		f1 : Fibonacci454 f1.value != -1 {sequence : s1};
		f2 : Fibonacci454 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci454 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result454
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse455 {
	when {
		not(f : Fibonacci455 f.sequence == 1);
		f1 : Fibonacci455 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci455(f1.sequence - 1));
	}
}

rule Bootstrap455 {
	when {
		f : Fibonacci455 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate455 {
	when {
		f1 : Fibonacci455 f1.value != -1 {sequence : s1};
		f2 : Fibonacci455 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci455 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result455
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse456 {
	when {
		not(f : Fibonacci456 f.sequence == 1);
		f1 : Fibonacci456 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci456(f1.sequence - 1));
	}
}

rule Bootstrap456 {
	when {
		f : Fibonacci456 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate456 {
	when {
		f1 : Fibonacci456 f1.value != -1 {sequence : s1};
		f2 : Fibonacci456 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci456 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result456
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse457 {
	when {
		not(f : Fibonacci457 f.sequence == 1);
		f1 : Fibonacci457 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci457(f1.sequence - 1));
	}
}

rule Bootstrap457 {
	when {
		f : Fibonacci457 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate457 {
	when {
		f1 : Fibonacci457 f1.value != -1 {sequence : s1};
		f2 : Fibonacci457 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci457 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result457
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse458 {
	when {
		not(f : Fibonacci458 f.sequence == 1);
		f1 : Fibonacci458 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci458(f1.sequence - 1));
	}
}

rule Bootstrap458 {
	when {
		f : Fibonacci458 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate458 {
	when {
		f1 : Fibonacci458 f1.value != -1 {sequence : s1};
		f2 : Fibonacci458 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci458 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result458
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse459 {
	when {
		not(f : Fibonacci459 f.sequence == 1);
		f1 : Fibonacci459 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci459(f1.sequence - 1));
	}
}

rule Bootstrap459 {
	when {
		f : Fibonacci459 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate459 {
	when {
		f1 : Fibonacci459 f1.value != -1 {sequence : s1};
		f2 : Fibonacci459 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci459 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result459
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse460 {
	when {
		not(f : Fibonacci460 f.sequence == 1);
		f1 : Fibonacci460 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci460(f1.sequence - 1));
	}
}

rule Bootstrap460 {
	when {
		f : Fibonacci460 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate460 {
	when {
		f1 : Fibonacci460 f1.value != -1 {sequence : s1};
		f2 : Fibonacci460 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci460 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result460
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse461 {
	when {
		not(f : Fibonacci461 f.sequence == 1);
		f1 : Fibonacci461 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci461(f1.sequence - 1));
	}
}

rule Bootstrap461 {
	when {
		f : Fibonacci461 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate461 {
	when {
		f1 : Fibonacci461 f1.value != -1 {sequence : s1};
		f2 : Fibonacci461 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci461 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result461
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse462 {
	when {
		not(f : Fibonacci462 f.sequence == 1);
		f1 : Fibonacci462 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci462(f1.sequence - 1));
	}
}

rule Bootstrap462 {
	when {
		f : Fibonacci462 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate462 {
	when {
		f1 : Fibonacci462 f1.value != -1 {sequence : s1};
		f2 : Fibonacci462 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci462 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result462
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse463 {
	when {
		not(f : Fibonacci463 f.sequence == 1);
		f1 : Fibonacci463 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci463(f1.sequence - 1));
	}
}

rule Bootstrap463 {
	when {
		f : Fibonacci463 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate463 {
	when {
		f1 : Fibonacci463 f1.value != -1 {sequence : s1};
		f2 : Fibonacci463 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci463 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result463
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse464 {
	when {
		not(f : Fibonacci464 f.sequence == 1);
		f1 : Fibonacci464 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci464(f1.sequence - 1));
	}
}

rule Bootstrap464 {
	when {
		f : Fibonacci464 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate464 {
	when {
		f1 : Fibonacci464 f1.value != -1 {sequence : s1};
		f2 : Fibonacci464 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci464 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result464
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse465 {
	when {
		not(f : Fibonacci465 f.sequence == 1);
		f1 : Fibonacci465 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci465(f1.sequence - 1));
	}
}

rule Bootstrap465 {
	when {
		f : Fibonacci465 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate465 {
	when {
		f1 : Fibonacci465 f1.value != -1 {sequence : s1};
		f2 : Fibonacci465 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci465 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result465
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse466 {
	when {
		not(f : Fibonacci466 f.sequence == 1);
		f1 : Fibonacci466 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci466(f1.sequence - 1));
	}
}

rule Bootstrap466 {
	when {
		f : Fibonacci466 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate466 {
	when {
		f1 : Fibonacci466 f1.value != -1 {sequence : s1};
		f2 : Fibonacci466 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci466 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result466
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse467 {
	when {
		not(f : Fibonacci467 f.sequence == 1);
		f1 : Fibonacci467 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci467(f1.sequence - 1));
	}
}

rule Bootstrap467 {
	when {
		f : Fibonacci467 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate467 {
	when {
		f1 : Fibonacci467 f1.value != -1 {sequence : s1};
		f2 : Fibonacci467 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci467 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result467
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse468 {
	when {
		not(f : Fibonacci468 f.sequence == 1);
		f1 : Fibonacci468 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci468(f1.sequence - 1));
	}
}

rule Bootstrap468 {
	when {
		f : Fibonacci468 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate468 {
	when {
		f1 : Fibonacci468 f1.value != -1 {sequence : s1};
		f2 : Fibonacci468 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci468 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result468
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse469 {
	when {
		not(f : Fibonacci469 f.sequence == 1);
		f1 : Fibonacci469 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci469(f1.sequence - 1));
	}
}

rule Bootstrap469 {
	when {
		f : Fibonacci469 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate469 {
	when {
		f1 : Fibonacci469 f1.value != -1 {sequence : s1};
		f2 : Fibonacci469 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci469 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result469
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse470 {
	when {
		not(f : Fibonacci470 f.sequence == 1);
		f1 : Fibonacci470 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci470(f1.sequence - 1));
	}
}

rule Bootstrap470 {
	when {
		f : Fibonacci470 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate470 {
	when {
		f1 : Fibonacci470 f1.value != -1 {sequence : s1};
		f2 : Fibonacci470 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci470 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result470
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse471 {
	when {
		not(f : Fibonacci471 f.sequence == 1);
		f1 : Fibonacci471 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci471(f1.sequence - 1));
	}
}

rule Bootstrap471 {
	when {
		f : Fibonacci471 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate471 {
	when {
		f1 : Fibonacci471 f1.value != -1 {sequence : s1};
		f2 : Fibonacci471 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci471 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result471
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse472 {
	when {
		not(f : Fibonacci472 f.sequence == 1);
		f1 : Fibonacci472 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci472(f1.sequence - 1));
	}
}

rule Bootstrap472 {
	when {
		f : Fibonacci472 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate472 {
	when {
		f1 : Fibonacci472 f1.value != -1 {sequence : s1};
		f2 : Fibonacci472 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci472 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result472
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse473 {
	when {
		not(f : Fibonacci473 f.sequence == 1);
		f1 : Fibonacci473 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci473(f1.sequence - 1));
	}
}

rule Bootstrap473 {
	when {
		f : Fibonacci473 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate473 {
	when {
		f1 : Fibonacci473 f1.value != -1 {sequence : s1};
		f2 : Fibonacci473 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci473 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result473
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse474 {
	when {
		not(f : Fibonacci474 f.sequence == 1);
		f1 : Fibonacci474 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci474(f1.sequence - 1));
	}
}

rule Bootstrap474 {
	when {
		f : Fibonacci474 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate474 {
	when {
		f1 : Fibonacci474 f1.value != -1 {sequence : s1};
		f2 : Fibonacci474 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci474 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result474
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse475 {
	when {
		not(f : Fibonacci475 f.sequence == 1);
		f1 : Fibonacci475 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci475(f1.sequence - 1));
	}
}

rule Bootstrap475 {
	when {
		f : Fibonacci475 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate475 {
	when {
		f1 : Fibonacci475 f1.value != -1 {sequence : s1};
		f2 : Fibonacci475 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci475 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result475
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse476 {
	when {
		not(f : Fibonacci476 f.sequence == 1);
		f1 : Fibonacci476 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci476(f1.sequence - 1));
	}
}

rule Bootstrap476 {
	when {
		f : Fibonacci476 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate476 {
	when {
		f1 : Fibonacci476 f1.value != -1 {sequence : s1};
		f2 : Fibonacci476 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci476 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result476
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse477 {
	when {
		not(f : Fibonacci477 f.sequence == 1);
		f1 : Fibonacci477 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci477(f1.sequence - 1));
	}
}

rule Bootstrap477 {
	when {
		f : Fibonacci477 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate477 {
	when {
		f1 : Fibonacci477 f1.value != -1 {sequence : s1};
		f2 : Fibonacci477 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci477 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result477
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse478 {
	when {
		not(f : Fibonacci478 f.sequence == 1);
		f1 : Fibonacci478 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci478(f1.sequence - 1));
	}
}

rule Bootstrap478 {
	when {
		f : Fibonacci478 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate478 {
	when {
		f1 : Fibonacci478 f1.value != -1 {sequence : s1};
		f2 : Fibonacci478 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci478 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result478
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse479 {
	when {
		not(f : Fibonacci479 f.sequence == 1);
		f1 : Fibonacci479 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci479(f1.sequence - 1));
	}
}

rule Bootstrap479 {
	when {
		f : Fibonacci479 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate479 {
	when {
		f1 : Fibonacci479 f1.value != -1 {sequence : s1};
		f2 : Fibonacci479 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci479 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result479
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse480 {
	when {
		not(f : Fibonacci480 f.sequence == 1);
		f1 : Fibonacci480 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci480(f1.sequence - 1));
	}
}

rule Bootstrap480 {
	when {
		f : Fibonacci480 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate480 {
	when {
		f1 : Fibonacci480 f1.value != -1 {sequence : s1};
		f2 : Fibonacci480 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci480 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result480
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse481 {
	when {
		not(f : Fibonacci481 f.sequence == 1);
		f1 : Fibonacci481 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci481(f1.sequence - 1));
	}
}

rule Bootstrap481 {
	when {
		f : Fibonacci481 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate481 {
	when {
		f1 : Fibonacci481 f1.value != -1 {sequence : s1};
		f2 : Fibonacci481 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci481 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result481
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse482 {
	when {
		not(f : Fibonacci482 f.sequence == 1);
		f1 : Fibonacci482 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci482(f1.sequence - 1));
	}
}

rule Bootstrap482 {
	when {
		f : Fibonacci482 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate482 {
	when {
		f1 : Fibonacci482 f1.value != -1 {sequence : s1};
		f2 : Fibonacci482 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci482 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result482
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse483 {
	when {
		not(f : Fibonacci483 f.sequence == 1);
		f1 : Fibonacci483 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci483(f1.sequence - 1));
	}
}

rule Bootstrap483 {
	when {
		f : Fibonacci483 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate483 {
	when {
		f1 : Fibonacci483 f1.value != -1 {sequence : s1};
		f2 : Fibonacci483 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci483 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result483
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse484 {
	when {
		not(f : Fibonacci484 f.sequence == 1);
		f1 : Fibonacci484 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci484(f1.sequence - 1));
	}
}

rule Bootstrap484 {
	when {
		f : Fibonacci484 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate484 {
	when {
		f1 : Fibonacci484 f1.value != -1 {sequence : s1};
		f2 : Fibonacci484 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci484 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result484
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse485 {
	when {
		not(f : Fibonacci485 f.sequence == 1);
		f1 : Fibonacci485 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci485(f1.sequence - 1));
	}
}

rule Bootstrap485 {
	when {
		f : Fibonacci485 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate485 {
	when {
		f1 : Fibonacci485 f1.value != -1 {sequence : s1};
		f2 : Fibonacci485 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci485 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result485
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse486 {
	when {
		not(f : Fibonacci486 f.sequence == 1);
		f1 : Fibonacci486 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci486(f1.sequence - 1));
	}
}

rule Bootstrap486 {
	when {
		f : Fibonacci486 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate486 {
	when {
		f1 : Fibonacci486 f1.value != -1 {sequence : s1};
		f2 : Fibonacci486 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci486 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result486
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse487 {
	when {
		not(f : Fibonacci487 f.sequence == 1);
		f1 : Fibonacci487 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci487(f1.sequence - 1));
	}
}

rule Bootstrap487 {
	when {
		f : Fibonacci487 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate487 {
	when {
		f1 : Fibonacci487 f1.value != -1 {sequence : s1};
		f2 : Fibonacci487 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci487 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result487
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse488 {
	when {
		not(f : Fibonacci488 f.sequence == 1);
		f1 : Fibonacci488 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci488(f1.sequence - 1));
	}
}

rule Bootstrap488 {
	when {
		f : Fibonacci488 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate488 {
	when {
		f1 : Fibonacci488 f1.value != -1 {sequence : s1};
		f2 : Fibonacci488 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci488 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result488
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse489 {
	when {
		not(f : Fibonacci489 f.sequence == 1);
		f1 : Fibonacci489 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci489(f1.sequence - 1));
	}
}

rule Bootstrap489 {
	when {
		f : Fibonacci489 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate489 {
	when {
		f1 : Fibonacci489 f1.value != -1 {sequence : s1};
		f2 : Fibonacci489 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci489 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result489
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse490 {
	when {
		not(f : Fibonacci490 f.sequence == 1);
		f1 : Fibonacci490 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci490(f1.sequence - 1));
	}
}

rule Bootstrap490 {
	when {
		f : Fibonacci490 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate490 {
	when {
		f1 : Fibonacci490 f1.value != -1 {sequence : s1};
		f2 : Fibonacci490 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci490 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result490
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse491 {
	when {
		not(f : Fibonacci491 f.sequence == 1);
		f1 : Fibonacci491 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci491(f1.sequence - 1));
	}
}

rule Bootstrap491 {
	when {
		f : Fibonacci491 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate491 {
	when {
		f1 : Fibonacci491 f1.value != -1 {sequence : s1};
		f2 : Fibonacci491 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci491 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result491
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse492 {
	when {
		not(f : Fibonacci492 f.sequence == 1);
		f1 : Fibonacci492 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci492(f1.sequence - 1));
	}
}

rule Bootstrap492 {
	when {
		f : Fibonacci492 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate492 {
	when {
		f1 : Fibonacci492 f1.value != -1 {sequence : s1};
		f2 : Fibonacci492 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci492 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result492
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse493 {
	when {
		not(f : Fibonacci493 f.sequence == 1);
		f1 : Fibonacci493 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci493(f1.sequence - 1));
	}
}

rule Bootstrap493 {
	when {
		f : Fibonacci493 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate493 {
	when {
		f1 : Fibonacci493 f1.value != -1 {sequence : s1};
		f2 : Fibonacci493 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci493 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result493
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse494 {
	when {
		not(f : Fibonacci494 f.sequence == 1);
		f1 : Fibonacci494 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci494(f1.sequence - 1));
	}
}

rule Bootstrap494 {
	when {
		f : Fibonacci494 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate494 {
	when {
		f1 : Fibonacci494 f1.value != -1 {sequence : s1};
		f2 : Fibonacci494 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci494 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result494
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse495 {
	when {
		not(f : Fibonacci495 f.sequence == 1);
		f1 : Fibonacci495 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci495(f1.sequence - 1));
	}
}

rule Bootstrap495 {
	when {
		f : Fibonacci495 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate495 {
	when {
		f1 : Fibonacci495 f1.value != -1 {sequence : s1};
		f2 : Fibonacci495 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci495 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result495
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse496 {
	when {
		not(f : Fibonacci496 f.sequence == 1);
		f1 : Fibonacci496 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci496(f1.sequence - 1));
	}
}

rule Bootstrap496 {
	when {
		f : Fibonacci496 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate496 {
	when {
		f1 : Fibonacci496 f1.value != -1 {sequence : s1};
		f2 : Fibonacci496 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci496 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result496
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse497 {
	when {
		not(f : Fibonacci497 f.sequence == 1);
		f1 : Fibonacci497 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci497(f1.sequence - 1));
	}
}

rule Bootstrap497 {
	when {
		f : Fibonacci497 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate497 {
	when {
		f1 : Fibonacci497 f1.value != -1 {sequence : s1};
		f2 : Fibonacci497 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci497 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result497
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse498 {
	when {
		not(f : Fibonacci498 f.sequence == 1);
		f1 : Fibonacci498 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci498(f1.sequence - 1));
	}
}

rule Bootstrap498 {
	when {
		f : Fibonacci498 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate498 {
	when {
		f1 : Fibonacci498 f1.value != -1 {sequence : s1};
		f2 : Fibonacci498 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci498 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result498
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}

rule Recurse499 {
	when {
		not(f : Fibonacci499 f.sequence == 1);
		f1 : Fibonacci499 f1.sequence != 1;
	}
	then {
		assert(new Fibonacci499(f1.sequence - 1));
	}
}

rule Bootstrap499 {
	when {
		f : Fibonacci499 f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate499 {
	when {
		f1 : Fibonacci499 f1.value != -1 {sequence : s1};
		f2 : Fibonacci499 f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci499 f3.value == -1 && f3.sequence == s2 + 1;
		r : Result499
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}
`;
const defines = new Map();
const scope = new Map();

class Fibonacci0 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result0 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci0', Fibonacci0);
defines.set('Result0', Result0);

class Fibonacci1 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result1 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci1', Fibonacci1);
defines.set('Result1', Result1);

class Fibonacci2 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result2 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci2', Fibonacci2);
defines.set('Result2', Result2);

class Fibonacci3 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result3 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci3', Fibonacci3);
defines.set('Result3', Result3);

class Fibonacci4 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result4 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci4', Fibonacci4);
defines.set('Result4', Result4);

class Fibonacci5 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result5 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci5', Fibonacci5);
defines.set('Result5', Result5);

class Fibonacci6 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result6 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci6', Fibonacci6);
defines.set('Result6', Result6);

class Fibonacci7 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result7 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci7', Fibonacci7);
defines.set('Result7', Result7);

class Fibonacci8 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result8 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci8', Fibonacci8);
defines.set('Result8', Result8);

class Fibonacci9 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result9 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci9', Fibonacci9);
defines.set('Result9', Result9);

class Fibonacci10 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result10 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci10', Fibonacci10);
defines.set('Result10', Result10);

class Fibonacci11 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result11 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci11', Fibonacci11);
defines.set('Result11', Result11);

class Fibonacci12 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result12 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci12', Fibonacci12);
defines.set('Result12', Result12);

class Fibonacci13 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result13 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci13', Fibonacci13);
defines.set('Result13', Result13);

class Fibonacci14 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result14 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci14', Fibonacci14);
defines.set('Result14', Result14);

class Fibonacci15 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result15 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci15', Fibonacci15);
defines.set('Result15', Result15);

class Fibonacci16 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result16 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci16', Fibonacci16);
defines.set('Result16', Result16);

class Fibonacci17 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result17 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci17', Fibonacci17);
defines.set('Result17', Result17);

class Fibonacci18 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result18 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci18', Fibonacci18);
defines.set('Result18', Result18);

class Fibonacci19 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result19 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci19', Fibonacci19);
defines.set('Result19', Result19);

class Fibonacci20 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result20 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci20', Fibonacci20);
defines.set('Result20', Result20);

class Fibonacci21 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result21 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci21', Fibonacci21);
defines.set('Result21', Result21);

class Fibonacci22 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result22 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci22', Fibonacci22);
defines.set('Result22', Result22);

class Fibonacci23 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result23 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci23', Fibonacci23);
defines.set('Result23', Result23);

class Fibonacci24 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result24 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci24', Fibonacci24);
defines.set('Result24', Result24);

class Fibonacci25 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result25 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci25', Fibonacci25);
defines.set('Result25', Result25);

class Fibonacci26 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result26 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci26', Fibonacci26);
defines.set('Result26', Result26);

class Fibonacci27 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result27 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci27', Fibonacci27);
defines.set('Result27', Result27);

class Fibonacci28 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result28 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci28', Fibonacci28);
defines.set('Result28', Result28);

class Fibonacci29 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result29 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci29', Fibonacci29);
defines.set('Result29', Result29);

class Fibonacci30 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result30 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci30', Fibonacci30);
defines.set('Result30', Result30);

class Fibonacci31 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result31 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci31', Fibonacci31);
defines.set('Result31', Result31);

class Fibonacci32 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result32 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci32', Fibonacci32);
defines.set('Result32', Result32);

class Fibonacci33 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result33 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci33', Fibonacci33);
defines.set('Result33', Result33);

class Fibonacci34 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result34 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci34', Fibonacci34);
defines.set('Result34', Result34);

class Fibonacci35 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result35 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci35', Fibonacci35);
defines.set('Result35', Result35);

class Fibonacci36 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result36 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci36', Fibonacci36);
defines.set('Result36', Result36);

class Fibonacci37 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result37 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci37', Fibonacci37);
defines.set('Result37', Result37);

class Fibonacci38 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result38 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci38', Fibonacci38);
defines.set('Result38', Result38);

class Fibonacci39 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result39 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci39', Fibonacci39);
defines.set('Result39', Result39);

class Fibonacci40 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result40 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci40', Fibonacci40);
defines.set('Result40', Result40);

class Fibonacci41 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result41 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci41', Fibonacci41);
defines.set('Result41', Result41);

class Fibonacci42 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result42 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci42', Fibonacci42);
defines.set('Result42', Result42);

class Fibonacci43 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result43 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci43', Fibonacci43);
defines.set('Result43', Result43);

class Fibonacci44 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result44 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci44', Fibonacci44);
defines.set('Result44', Result44);

class Fibonacci45 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result45 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci45', Fibonacci45);
defines.set('Result45', Result45);

class Fibonacci46 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result46 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci46', Fibonacci46);
defines.set('Result46', Result46);

class Fibonacci47 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result47 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci47', Fibonacci47);
defines.set('Result47', Result47);

class Fibonacci48 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result48 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci48', Fibonacci48);
defines.set('Result48', Result48);

class Fibonacci49 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result49 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci49', Fibonacci49);
defines.set('Result49', Result49);

class Fibonacci50 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result50 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci50', Fibonacci50);
defines.set('Result50', Result50);

class Fibonacci51 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result51 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci51', Fibonacci51);
defines.set('Result51', Result51);

class Fibonacci52 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result52 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci52', Fibonacci52);
defines.set('Result52', Result52);

class Fibonacci53 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result53 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci53', Fibonacci53);
defines.set('Result53', Result53);

class Fibonacci54 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result54 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci54', Fibonacci54);
defines.set('Result54', Result54);

class Fibonacci55 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result55 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci55', Fibonacci55);
defines.set('Result55', Result55);

class Fibonacci56 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result56 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci56', Fibonacci56);
defines.set('Result56', Result56);

class Fibonacci57 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result57 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci57', Fibonacci57);
defines.set('Result57', Result57);

class Fibonacci58 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result58 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci58', Fibonacci58);
defines.set('Result58', Result58);

class Fibonacci59 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result59 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci59', Fibonacci59);
defines.set('Result59', Result59);

class Fibonacci60 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result60 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci60', Fibonacci60);
defines.set('Result60', Result60);

class Fibonacci61 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result61 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci61', Fibonacci61);
defines.set('Result61', Result61);

class Fibonacci62 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result62 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci62', Fibonacci62);
defines.set('Result62', Result62);

class Fibonacci63 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result63 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci63', Fibonacci63);
defines.set('Result63', Result63);

class Fibonacci64 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result64 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci64', Fibonacci64);
defines.set('Result64', Result64);

class Fibonacci65 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result65 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci65', Fibonacci65);
defines.set('Result65', Result65);

class Fibonacci66 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result66 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci66', Fibonacci66);
defines.set('Result66', Result66);

class Fibonacci67 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result67 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci67', Fibonacci67);
defines.set('Result67', Result67);

class Fibonacci68 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result68 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci68', Fibonacci68);
defines.set('Result68', Result68);

class Fibonacci69 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result69 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci69', Fibonacci69);
defines.set('Result69', Result69);

class Fibonacci70 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result70 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci70', Fibonacci70);
defines.set('Result70', Result70);

class Fibonacci71 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result71 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci71', Fibonacci71);
defines.set('Result71', Result71);

class Fibonacci72 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result72 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci72', Fibonacci72);
defines.set('Result72', Result72);

class Fibonacci73 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result73 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci73', Fibonacci73);
defines.set('Result73', Result73);

class Fibonacci74 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result74 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci74', Fibonacci74);
defines.set('Result74', Result74);

class Fibonacci75 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result75 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci75', Fibonacci75);
defines.set('Result75', Result75);

class Fibonacci76 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result76 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci76', Fibonacci76);
defines.set('Result76', Result76);

class Fibonacci77 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result77 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci77', Fibonacci77);
defines.set('Result77', Result77);

class Fibonacci78 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result78 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci78', Fibonacci78);
defines.set('Result78', Result78);

class Fibonacci79 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result79 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci79', Fibonacci79);
defines.set('Result79', Result79);

class Fibonacci80 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result80 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci80', Fibonacci80);
defines.set('Result80', Result80);

class Fibonacci81 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result81 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci81', Fibonacci81);
defines.set('Result81', Result81);

class Fibonacci82 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result82 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci82', Fibonacci82);
defines.set('Result82', Result82);

class Fibonacci83 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result83 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci83', Fibonacci83);
defines.set('Result83', Result83);

class Fibonacci84 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result84 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci84', Fibonacci84);
defines.set('Result84', Result84);

class Fibonacci85 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result85 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci85', Fibonacci85);
defines.set('Result85', Result85);

class Fibonacci86 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result86 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci86', Fibonacci86);
defines.set('Result86', Result86);

class Fibonacci87 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result87 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci87', Fibonacci87);
defines.set('Result87', Result87);

class Fibonacci88 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result88 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci88', Fibonacci88);
defines.set('Result88', Result88);

class Fibonacci89 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result89 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci89', Fibonacci89);
defines.set('Result89', Result89);

class Fibonacci90 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result90 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci90', Fibonacci90);
defines.set('Result90', Result90);

class Fibonacci91 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result91 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci91', Fibonacci91);
defines.set('Result91', Result91);

class Fibonacci92 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result92 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci92', Fibonacci92);
defines.set('Result92', Result92);

class Fibonacci93 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result93 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci93', Fibonacci93);
defines.set('Result93', Result93);

class Fibonacci94 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result94 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci94', Fibonacci94);
defines.set('Result94', Result94);

class Fibonacci95 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result95 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci95', Fibonacci95);
defines.set('Result95', Result95);

class Fibonacci96 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result96 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci96', Fibonacci96);
defines.set('Result96', Result96);

class Fibonacci97 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result97 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci97', Fibonacci97);
defines.set('Result97', Result97);

class Fibonacci98 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result98 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci98', Fibonacci98);
defines.set('Result98', Result98);

class Fibonacci99 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result99 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci99', Fibonacci99);
defines.set('Result99', Result99);

class Fibonacci100 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result100 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci100', Fibonacci100);
defines.set('Result100', Result100);

class Fibonacci101 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result101 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci101', Fibonacci101);
defines.set('Result101', Result101);

class Fibonacci102 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result102 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci102', Fibonacci102);
defines.set('Result102', Result102);

class Fibonacci103 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result103 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci103', Fibonacci103);
defines.set('Result103', Result103);

class Fibonacci104 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result104 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci104', Fibonacci104);
defines.set('Result104', Result104);

class Fibonacci105 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result105 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci105', Fibonacci105);
defines.set('Result105', Result105);

class Fibonacci106 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result106 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci106', Fibonacci106);
defines.set('Result106', Result106);

class Fibonacci107 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result107 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci107', Fibonacci107);
defines.set('Result107', Result107);

class Fibonacci108 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result108 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci108', Fibonacci108);
defines.set('Result108', Result108);

class Fibonacci109 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result109 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci109', Fibonacci109);
defines.set('Result109', Result109);

class Fibonacci110 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result110 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci110', Fibonacci110);
defines.set('Result110', Result110);

class Fibonacci111 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result111 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci111', Fibonacci111);
defines.set('Result111', Result111);

class Fibonacci112 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result112 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci112', Fibonacci112);
defines.set('Result112', Result112);

class Fibonacci113 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result113 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci113', Fibonacci113);
defines.set('Result113', Result113);

class Fibonacci114 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result114 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci114', Fibonacci114);
defines.set('Result114', Result114);

class Fibonacci115 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result115 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci115', Fibonacci115);
defines.set('Result115', Result115);

class Fibonacci116 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result116 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci116', Fibonacci116);
defines.set('Result116', Result116);

class Fibonacci117 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result117 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci117', Fibonacci117);
defines.set('Result117', Result117);

class Fibonacci118 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result118 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci118', Fibonacci118);
defines.set('Result118', Result118);

class Fibonacci119 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result119 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci119', Fibonacci119);
defines.set('Result119', Result119);

class Fibonacci120 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result120 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci120', Fibonacci120);
defines.set('Result120', Result120);

class Fibonacci121 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result121 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci121', Fibonacci121);
defines.set('Result121', Result121);

class Fibonacci122 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result122 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci122', Fibonacci122);
defines.set('Result122', Result122);

class Fibonacci123 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result123 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci123', Fibonacci123);
defines.set('Result123', Result123);

class Fibonacci124 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result124 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci124', Fibonacci124);
defines.set('Result124', Result124);

class Fibonacci125 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result125 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci125', Fibonacci125);
defines.set('Result125', Result125);

class Fibonacci126 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result126 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci126', Fibonacci126);
defines.set('Result126', Result126);

class Fibonacci127 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result127 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci127', Fibonacci127);
defines.set('Result127', Result127);

class Fibonacci128 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result128 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci128', Fibonacci128);
defines.set('Result128', Result128);

class Fibonacci129 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result129 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci129', Fibonacci129);
defines.set('Result129', Result129);

class Fibonacci130 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result130 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci130', Fibonacci130);
defines.set('Result130', Result130);

class Fibonacci131 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result131 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci131', Fibonacci131);
defines.set('Result131', Result131);

class Fibonacci132 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result132 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci132', Fibonacci132);
defines.set('Result132', Result132);

class Fibonacci133 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result133 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci133', Fibonacci133);
defines.set('Result133', Result133);

class Fibonacci134 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result134 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci134', Fibonacci134);
defines.set('Result134', Result134);

class Fibonacci135 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result135 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci135', Fibonacci135);
defines.set('Result135', Result135);

class Fibonacci136 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result136 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci136', Fibonacci136);
defines.set('Result136', Result136);

class Fibonacci137 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result137 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci137', Fibonacci137);
defines.set('Result137', Result137);

class Fibonacci138 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result138 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci138', Fibonacci138);
defines.set('Result138', Result138);

class Fibonacci139 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result139 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci139', Fibonacci139);
defines.set('Result139', Result139);

class Fibonacci140 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result140 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci140', Fibonacci140);
defines.set('Result140', Result140);

class Fibonacci141 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result141 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci141', Fibonacci141);
defines.set('Result141', Result141);

class Fibonacci142 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result142 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci142', Fibonacci142);
defines.set('Result142', Result142);

class Fibonacci143 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result143 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci143', Fibonacci143);
defines.set('Result143', Result143);

class Fibonacci144 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result144 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci144', Fibonacci144);
defines.set('Result144', Result144);

class Fibonacci145 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result145 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci145', Fibonacci145);
defines.set('Result145', Result145);

class Fibonacci146 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result146 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci146', Fibonacci146);
defines.set('Result146', Result146);

class Fibonacci147 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result147 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci147', Fibonacci147);
defines.set('Result147', Result147);

class Fibonacci148 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result148 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci148', Fibonacci148);
defines.set('Result148', Result148);

class Fibonacci149 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result149 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci149', Fibonacci149);
defines.set('Result149', Result149);

class Fibonacci150 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result150 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci150', Fibonacci150);
defines.set('Result150', Result150);

class Fibonacci151 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result151 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci151', Fibonacci151);
defines.set('Result151', Result151);

class Fibonacci152 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result152 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci152', Fibonacci152);
defines.set('Result152', Result152);

class Fibonacci153 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result153 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci153', Fibonacci153);
defines.set('Result153', Result153);

class Fibonacci154 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result154 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci154', Fibonacci154);
defines.set('Result154', Result154);

class Fibonacci155 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result155 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci155', Fibonacci155);
defines.set('Result155', Result155);

class Fibonacci156 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result156 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci156', Fibonacci156);
defines.set('Result156', Result156);

class Fibonacci157 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result157 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci157', Fibonacci157);
defines.set('Result157', Result157);

class Fibonacci158 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result158 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci158', Fibonacci158);
defines.set('Result158', Result158);

class Fibonacci159 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result159 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci159', Fibonacci159);
defines.set('Result159', Result159);

class Fibonacci160 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result160 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci160', Fibonacci160);
defines.set('Result160', Result160);

class Fibonacci161 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result161 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci161', Fibonacci161);
defines.set('Result161', Result161);

class Fibonacci162 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result162 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci162', Fibonacci162);
defines.set('Result162', Result162);

class Fibonacci163 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result163 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci163', Fibonacci163);
defines.set('Result163', Result163);

class Fibonacci164 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result164 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci164', Fibonacci164);
defines.set('Result164', Result164);

class Fibonacci165 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result165 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci165', Fibonacci165);
defines.set('Result165', Result165);

class Fibonacci166 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result166 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci166', Fibonacci166);
defines.set('Result166', Result166);

class Fibonacci167 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result167 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci167', Fibonacci167);
defines.set('Result167', Result167);

class Fibonacci168 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result168 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci168', Fibonacci168);
defines.set('Result168', Result168);

class Fibonacci169 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result169 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci169', Fibonacci169);
defines.set('Result169', Result169);

class Fibonacci170 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result170 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci170', Fibonacci170);
defines.set('Result170', Result170);

class Fibonacci171 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result171 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci171', Fibonacci171);
defines.set('Result171', Result171);

class Fibonacci172 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result172 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci172', Fibonacci172);
defines.set('Result172', Result172);

class Fibonacci173 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result173 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci173', Fibonacci173);
defines.set('Result173', Result173);

class Fibonacci174 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result174 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci174', Fibonacci174);
defines.set('Result174', Result174);

class Fibonacci175 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result175 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci175', Fibonacci175);
defines.set('Result175', Result175);

class Fibonacci176 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result176 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci176', Fibonacci176);
defines.set('Result176', Result176);

class Fibonacci177 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result177 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci177', Fibonacci177);
defines.set('Result177', Result177);

class Fibonacci178 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result178 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci178', Fibonacci178);
defines.set('Result178', Result178);

class Fibonacci179 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result179 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci179', Fibonacci179);
defines.set('Result179', Result179);

class Fibonacci180 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result180 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci180', Fibonacci180);
defines.set('Result180', Result180);

class Fibonacci181 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result181 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci181', Fibonacci181);
defines.set('Result181', Result181);

class Fibonacci182 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result182 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci182', Fibonacci182);
defines.set('Result182', Result182);

class Fibonacci183 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result183 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci183', Fibonacci183);
defines.set('Result183', Result183);

class Fibonacci184 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result184 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci184', Fibonacci184);
defines.set('Result184', Result184);

class Fibonacci185 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result185 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci185', Fibonacci185);
defines.set('Result185', Result185);

class Fibonacci186 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result186 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci186', Fibonacci186);
defines.set('Result186', Result186);

class Fibonacci187 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result187 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci187', Fibonacci187);
defines.set('Result187', Result187);

class Fibonacci188 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result188 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci188', Fibonacci188);
defines.set('Result188', Result188);

class Fibonacci189 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result189 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci189', Fibonacci189);
defines.set('Result189', Result189);

class Fibonacci190 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result190 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci190', Fibonacci190);
defines.set('Result190', Result190);

class Fibonacci191 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result191 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci191', Fibonacci191);
defines.set('Result191', Result191);

class Fibonacci192 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result192 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci192', Fibonacci192);
defines.set('Result192', Result192);

class Fibonacci193 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result193 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci193', Fibonacci193);
defines.set('Result193', Result193);

class Fibonacci194 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result194 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci194', Fibonacci194);
defines.set('Result194', Result194);

class Fibonacci195 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result195 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci195', Fibonacci195);
defines.set('Result195', Result195);

class Fibonacci196 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result196 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci196', Fibonacci196);
defines.set('Result196', Result196);

class Fibonacci197 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result197 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci197', Fibonacci197);
defines.set('Result197', Result197);

class Fibonacci198 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result198 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci198', Fibonacci198);
defines.set('Result198', Result198);

class Fibonacci199 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result199 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci199', Fibonacci199);
defines.set('Result199', Result199);

class Fibonacci200 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result200 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci200', Fibonacci200);
defines.set('Result200', Result200);

class Fibonacci201 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result201 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci201', Fibonacci201);
defines.set('Result201', Result201);

class Fibonacci202 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result202 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci202', Fibonacci202);
defines.set('Result202', Result202);

class Fibonacci203 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result203 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci203', Fibonacci203);
defines.set('Result203', Result203);

class Fibonacci204 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result204 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci204', Fibonacci204);
defines.set('Result204', Result204);

class Fibonacci205 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result205 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci205', Fibonacci205);
defines.set('Result205', Result205);

class Fibonacci206 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result206 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci206', Fibonacci206);
defines.set('Result206', Result206);

class Fibonacci207 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result207 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci207', Fibonacci207);
defines.set('Result207', Result207);

class Fibonacci208 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result208 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci208', Fibonacci208);
defines.set('Result208', Result208);

class Fibonacci209 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result209 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci209', Fibonacci209);
defines.set('Result209', Result209);

class Fibonacci210 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result210 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci210', Fibonacci210);
defines.set('Result210', Result210);

class Fibonacci211 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result211 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci211', Fibonacci211);
defines.set('Result211', Result211);

class Fibonacci212 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result212 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci212', Fibonacci212);
defines.set('Result212', Result212);

class Fibonacci213 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result213 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci213', Fibonacci213);
defines.set('Result213', Result213);

class Fibonacci214 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result214 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci214', Fibonacci214);
defines.set('Result214', Result214);

class Fibonacci215 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result215 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci215', Fibonacci215);
defines.set('Result215', Result215);

class Fibonacci216 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result216 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci216', Fibonacci216);
defines.set('Result216', Result216);

class Fibonacci217 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result217 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci217', Fibonacci217);
defines.set('Result217', Result217);

class Fibonacci218 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result218 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci218', Fibonacci218);
defines.set('Result218', Result218);

class Fibonacci219 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result219 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci219', Fibonacci219);
defines.set('Result219', Result219);

class Fibonacci220 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result220 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci220', Fibonacci220);
defines.set('Result220', Result220);

class Fibonacci221 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result221 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci221', Fibonacci221);
defines.set('Result221', Result221);

class Fibonacci222 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result222 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci222', Fibonacci222);
defines.set('Result222', Result222);

class Fibonacci223 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result223 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci223', Fibonacci223);
defines.set('Result223', Result223);

class Fibonacci224 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result224 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci224', Fibonacci224);
defines.set('Result224', Result224);

class Fibonacci225 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result225 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci225', Fibonacci225);
defines.set('Result225', Result225);

class Fibonacci226 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result226 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci226', Fibonacci226);
defines.set('Result226', Result226);

class Fibonacci227 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result227 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci227', Fibonacci227);
defines.set('Result227', Result227);

class Fibonacci228 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result228 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci228', Fibonacci228);
defines.set('Result228', Result228);

class Fibonacci229 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result229 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci229', Fibonacci229);
defines.set('Result229', Result229);

class Fibonacci230 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result230 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci230', Fibonacci230);
defines.set('Result230', Result230);

class Fibonacci231 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result231 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci231', Fibonacci231);
defines.set('Result231', Result231);

class Fibonacci232 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result232 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci232', Fibonacci232);
defines.set('Result232', Result232);

class Fibonacci233 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result233 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci233', Fibonacci233);
defines.set('Result233', Result233);

class Fibonacci234 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result234 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci234', Fibonacci234);
defines.set('Result234', Result234);

class Fibonacci235 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result235 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci235', Fibonacci235);
defines.set('Result235', Result235);

class Fibonacci236 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result236 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci236', Fibonacci236);
defines.set('Result236', Result236);

class Fibonacci237 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result237 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci237', Fibonacci237);
defines.set('Result237', Result237);

class Fibonacci238 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result238 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci238', Fibonacci238);
defines.set('Result238', Result238);

class Fibonacci239 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result239 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci239', Fibonacci239);
defines.set('Result239', Result239);

class Fibonacci240 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result240 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci240', Fibonacci240);
defines.set('Result240', Result240);

class Fibonacci241 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result241 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci241', Fibonacci241);
defines.set('Result241', Result241);

class Fibonacci242 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result242 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci242', Fibonacci242);
defines.set('Result242', Result242);

class Fibonacci243 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result243 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci243', Fibonacci243);
defines.set('Result243', Result243);

class Fibonacci244 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result244 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci244', Fibonacci244);
defines.set('Result244', Result244);

class Fibonacci245 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result245 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci245', Fibonacci245);
defines.set('Result245', Result245);

class Fibonacci246 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result246 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci246', Fibonacci246);
defines.set('Result246', Result246);

class Fibonacci247 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result247 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci247', Fibonacci247);
defines.set('Result247', Result247);

class Fibonacci248 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result248 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci248', Fibonacci248);
defines.set('Result248', Result248);

class Fibonacci249 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result249 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci249', Fibonacci249);
defines.set('Result249', Result249);

class Fibonacci250 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result250 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci250', Fibonacci250);
defines.set('Result250', Result250);

class Fibonacci251 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result251 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci251', Fibonacci251);
defines.set('Result251', Result251);

class Fibonacci252 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result252 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci252', Fibonacci252);
defines.set('Result252', Result252);

class Fibonacci253 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result253 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci253', Fibonacci253);
defines.set('Result253', Result253);

class Fibonacci254 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result254 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci254', Fibonacci254);
defines.set('Result254', Result254);

class Fibonacci255 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result255 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci255', Fibonacci255);
defines.set('Result255', Result255);

class Fibonacci256 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result256 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci256', Fibonacci256);
defines.set('Result256', Result256);

class Fibonacci257 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result257 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci257', Fibonacci257);
defines.set('Result257', Result257);

class Fibonacci258 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result258 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci258', Fibonacci258);
defines.set('Result258', Result258);

class Fibonacci259 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result259 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci259', Fibonacci259);
defines.set('Result259', Result259);

class Fibonacci260 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result260 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci260', Fibonacci260);
defines.set('Result260', Result260);

class Fibonacci261 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result261 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci261', Fibonacci261);
defines.set('Result261', Result261);

class Fibonacci262 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result262 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci262', Fibonacci262);
defines.set('Result262', Result262);

class Fibonacci263 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result263 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci263', Fibonacci263);
defines.set('Result263', Result263);

class Fibonacci264 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result264 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci264', Fibonacci264);
defines.set('Result264', Result264);

class Fibonacci265 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result265 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci265', Fibonacci265);
defines.set('Result265', Result265);

class Fibonacci266 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result266 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci266', Fibonacci266);
defines.set('Result266', Result266);

class Fibonacci267 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result267 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci267', Fibonacci267);
defines.set('Result267', Result267);

class Fibonacci268 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result268 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci268', Fibonacci268);
defines.set('Result268', Result268);

class Fibonacci269 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result269 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci269', Fibonacci269);
defines.set('Result269', Result269);

class Fibonacci270 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result270 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci270', Fibonacci270);
defines.set('Result270', Result270);

class Fibonacci271 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result271 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci271', Fibonacci271);
defines.set('Result271', Result271);

class Fibonacci272 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result272 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci272', Fibonacci272);
defines.set('Result272', Result272);

class Fibonacci273 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result273 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci273', Fibonacci273);
defines.set('Result273', Result273);

class Fibonacci274 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result274 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci274', Fibonacci274);
defines.set('Result274', Result274);

class Fibonacci275 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result275 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci275', Fibonacci275);
defines.set('Result275', Result275);

class Fibonacci276 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result276 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci276', Fibonacci276);
defines.set('Result276', Result276);

class Fibonacci277 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result277 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci277', Fibonacci277);
defines.set('Result277', Result277);

class Fibonacci278 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result278 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci278', Fibonacci278);
defines.set('Result278', Result278);

class Fibonacci279 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result279 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci279', Fibonacci279);
defines.set('Result279', Result279);

class Fibonacci280 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result280 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci280', Fibonacci280);
defines.set('Result280', Result280);

class Fibonacci281 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result281 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci281', Fibonacci281);
defines.set('Result281', Result281);

class Fibonacci282 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result282 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci282', Fibonacci282);
defines.set('Result282', Result282);

class Fibonacci283 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result283 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci283', Fibonacci283);
defines.set('Result283', Result283);

class Fibonacci284 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result284 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci284', Fibonacci284);
defines.set('Result284', Result284);

class Fibonacci285 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result285 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci285', Fibonacci285);
defines.set('Result285', Result285);

class Fibonacci286 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result286 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci286', Fibonacci286);
defines.set('Result286', Result286);

class Fibonacci287 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result287 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci287', Fibonacci287);
defines.set('Result287', Result287);

class Fibonacci288 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result288 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci288', Fibonacci288);
defines.set('Result288', Result288);

class Fibonacci289 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result289 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci289', Fibonacci289);
defines.set('Result289', Result289);

class Fibonacci290 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result290 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci290', Fibonacci290);
defines.set('Result290', Result290);

class Fibonacci291 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result291 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci291', Fibonacci291);
defines.set('Result291', Result291);

class Fibonacci292 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result292 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci292', Fibonacci292);
defines.set('Result292', Result292);

class Fibonacci293 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result293 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci293', Fibonacci293);
defines.set('Result293', Result293);

class Fibonacci294 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result294 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci294', Fibonacci294);
defines.set('Result294', Result294);

class Fibonacci295 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result295 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci295', Fibonacci295);
defines.set('Result295', Result295);

class Fibonacci296 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result296 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci296', Fibonacci296);
defines.set('Result296', Result296);

class Fibonacci297 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result297 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci297', Fibonacci297);
defines.set('Result297', Result297);

class Fibonacci298 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result298 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci298', Fibonacci298);
defines.set('Result298', Result298);

class Fibonacci299 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result299 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci299', Fibonacci299);
defines.set('Result299', Result299);

class Fibonacci300 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result300 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci300', Fibonacci300);
defines.set('Result300', Result300);

class Fibonacci301 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result301 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci301', Fibonacci301);
defines.set('Result301', Result301);

class Fibonacci302 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result302 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci302', Fibonacci302);
defines.set('Result302', Result302);

class Fibonacci303 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result303 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci303', Fibonacci303);
defines.set('Result303', Result303);

class Fibonacci304 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result304 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci304', Fibonacci304);
defines.set('Result304', Result304);

class Fibonacci305 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result305 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci305', Fibonacci305);
defines.set('Result305', Result305);

class Fibonacci306 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result306 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci306', Fibonacci306);
defines.set('Result306', Result306);

class Fibonacci307 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result307 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci307', Fibonacci307);
defines.set('Result307', Result307);

class Fibonacci308 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result308 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci308', Fibonacci308);
defines.set('Result308', Result308);

class Fibonacci309 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result309 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci309', Fibonacci309);
defines.set('Result309', Result309);

class Fibonacci310 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result310 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci310', Fibonacci310);
defines.set('Result310', Result310);

class Fibonacci311 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result311 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci311', Fibonacci311);
defines.set('Result311', Result311);

class Fibonacci312 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result312 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci312', Fibonacci312);
defines.set('Result312', Result312);

class Fibonacci313 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result313 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci313', Fibonacci313);
defines.set('Result313', Result313);

class Fibonacci314 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result314 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci314', Fibonacci314);
defines.set('Result314', Result314);

class Fibonacci315 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result315 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci315', Fibonacci315);
defines.set('Result315', Result315);

class Fibonacci316 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result316 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci316', Fibonacci316);
defines.set('Result316', Result316);

class Fibonacci317 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result317 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci317', Fibonacci317);
defines.set('Result317', Result317);

class Fibonacci318 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result318 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci318', Fibonacci318);
defines.set('Result318', Result318);

class Fibonacci319 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result319 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci319', Fibonacci319);
defines.set('Result319', Result319);

class Fibonacci320 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result320 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci320', Fibonacci320);
defines.set('Result320', Result320);

class Fibonacci321 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result321 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci321', Fibonacci321);
defines.set('Result321', Result321);

class Fibonacci322 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result322 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci322', Fibonacci322);
defines.set('Result322', Result322);

class Fibonacci323 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result323 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci323', Fibonacci323);
defines.set('Result323', Result323);

class Fibonacci324 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result324 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci324', Fibonacci324);
defines.set('Result324', Result324);

class Fibonacci325 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result325 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci325', Fibonacci325);
defines.set('Result325', Result325);

class Fibonacci326 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result326 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci326', Fibonacci326);
defines.set('Result326', Result326);

class Fibonacci327 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result327 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci327', Fibonacci327);
defines.set('Result327', Result327);

class Fibonacci328 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result328 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci328', Fibonacci328);
defines.set('Result328', Result328);

class Fibonacci329 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result329 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci329', Fibonacci329);
defines.set('Result329', Result329);

class Fibonacci330 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result330 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci330', Fibonacci330);
defines.set('Result330', Result330);

class Fibonacci331 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result331 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci331', Fibonacci331);
defines.set('Result331', Result331);

class Fibonacci332 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result332 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci332', Fibonacci332);
defines.set('Result332', Result332);

class Fibonacci333 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result333 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci333', Fibonacci333);
defines.set('Result333', Result333);

class Fibonacci334 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result334 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci334', Fibonacci334);
defines.set('Result334', Result334);

class Fibonacci335 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result335 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci335', Fibonacci335);
defines.set('Result335', Result335);

class Fibonacci336 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result336 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci336', Fibonacci336);
defines.set('Result336', Result336);

class Fibonacci337 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result337 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci337', Fibonacci337);
defines.set('Result337', Result337);

class Fibonacci338 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result338 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci338', Fibonacci338);
defines.set('Result338', Result338);

class Fibonacci339 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result339 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci339', Fibonacci339);
defines.set('Result339', Result339);

class Fibonacci340 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result340 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci340', Fibonacci340);
defines.set('Result340', Result340);

class Fibonacci341 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result341 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci341', Fibonacci341);
defines.set('Result341', Result341);

class Fibonacci342 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result342 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci342', Fibonacci342);
defines.set('Result342', Result342);

class Fibonacci343 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result343 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci343', Fibonacci343);
defines.set('Result343', Result343);

class Fibonacci344 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result344 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci344', Fibonacci344);
defines.set('Result344', Result344);

class Fibonacci345 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result345 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci345', Fibonacci345);
defines.set('Result345', Result345);

class Fibonacci346 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result346 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci346', Fibonacci346);
defines.set('Result346', Result346);

class Fibonacci347 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result347 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci347', Fibonacci347);
defines.set('Result347', Result347);

class Fibonacci348 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result348 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci348', Fibonacci348);
defines.set('Result348', Result348);

class Fibonacci349 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result349 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci349', Fibonacci349);
defines.set('Result349', Result349);

class Fibonacci350 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result350 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci350', Fibonacci350);
defines.set('Result350', Result350);

class Fibonacci351 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result351 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci351', Fibonacci351);
defines.set('Result351', Result351);

class Fibonacci352 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result352 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci352', Fibonacci352);
defines.set('Result352', Result352);

class Fibonacci353 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result353 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci353', Fibonacci353);
defines.set('Result353', Result353);

class Fibonacci354 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result354 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci354', Fibonacci354);
defines.set('Result354', Result354);

class Fibonacci355 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result355 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci355', Fibonacci355);
defines.set('Result355', Result355);

class Fibonacci356 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result356 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci356', Fibonacci356);
defines.set('Result356', Result356);

class Fibonacci357 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result357 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci357', Fibonacci357);
defines.set('Result357', Result357);

class Fibonacci358 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result358 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci358', Fibonacci358);
defines.set('Result358', Result358);

class Fibonacci359 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result359 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci359', Fibonacci359);
defines.set('Result359', Result359);

class Fibonacci360 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result360 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci360', Fibonacci360);
defines.set('Result360', Result360);

class Fibonacci361 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result361 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci361', Fibonacci361);
defines.set('Result361', Result361);

class Fibonacci362 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result362 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci362', Fibonacci362);
defines.set('Result362', Result362);

class Fibonacci363 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result363 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci363', Fibonacci363);
defines.set('Result363', Result363);

class Fibonacci364 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result364 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci364', Fibonacci364);
defines.set('Result364', Result364);

class Fibonacci365 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result365 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci365', Fibonacci365);
defines.set('Result365', Result365);

class Fibonacci366 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result366 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci366', Fibonacci366);
defines.set('Result366', Result366);

class Fibonacci367 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result367 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci367', Fibonacci367);
defines.set('Result367', Result367);

class Fibonacci368 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result368 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci368', Fibonacci368);
defines.set('Result368', Result368);

class Fibonacci369 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result369 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci369', Fibonacci369);
defines.set('Result369', Result369);

class Fibonacci370 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result370 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci370', Fibonacci370);
defines.set('Result370', Result370);

class Fibonacci371 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result371 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci371', Fibonacci371);
defines.set('Result371', Result371);

class Fibonacci372 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result372 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci372', Fibonacci372);
defines.set('Result372', Result372);

class Fibonacci373 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result373 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci373', Fibonacci373);
defines.set('Result373', Result373);

class Fibonacci374 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result374 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci374', Fibonacci374);
defines.set('Result374', Result374);

class Fibonacci375 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result375 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci375', Fibonacci375);
defines.set('Result375', Result375);

class Fibonacci376 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result376 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci376', Fibonacci376);
defines.set('Result376', Result376);

class Fibonacci377 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result377 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci377', Fibonacci377);
defines.set('Result377', Result377);

class Fibonacci378 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result378 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci378', Fibonacci378);
defines.set('Result378', Result378);

class Fibonacci379 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result379 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci379', Fibonacci379);
defines.set('Result379', Result379);

class Fibonacci380 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result380 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci380', Fibonacci380);
defines.set('Result380', Result380);

class Fibonacci381 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result381 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci381', Fibonacci381);
defines.set('Result381', Result381);

class Fibonacci382 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result382 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci382', Fibonacci382);
defines.set('Result382', Result382);

class Fibonacci383 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result383 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci383', Fibonacci383);
defines.set('Result383', Result383);

class Fibonacci384 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result384 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci384', Fibonacci384);
defines.set('Result384', Result384);

class Fibonacci385 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result385 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci385', Fibonacci385);
defines.set('Result385', Result385);

class Fibonacci386 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result386 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci386', Fibonacci386);
defines.set('Result386', Result386);

class Fibonacci387 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result387 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci387', Fibonacci387);
defines.set('Result387', Result387);

class Fibonacci388 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result388 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci388', Fibonacci388);
defines.set('Result388', Result388);

class Fibonacci389 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result389 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci389', Fibonacci389);
defines.set('Result389', Result389);

class Fibonacci390 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result390 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci390', Fibonacci390);
defines.set('Result390', Result390);

class Fibonacci391 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result391 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci391', Fibonacci391);
defines.set('Result391', Result391);

class Fibonacci392 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result392 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci392', Fibonacci392);
defines.set('Result392', Result392);

class Fibonacci393 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result393 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci393', Fibonacci393);
defines.set('Result393', Result393);

class Fibonacci394 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result394 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci394', Fibonacci394);
defines.set('Result394', Result394);

class Fibonacci395 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result395 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci395', Fibonacci395);
defines.set('Result395', Result395);

class Fibonacci396 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result396 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci396', Fibonacci396);
defines.set('Result396', Result396);

class Fibonacci397 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result397 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci397', Fibonacci397);
defines.set('Result397', Result397);

class Fibonacci398 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result398 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci398', Fibonacci398);
defines.set('Result398', Result398);

class Fibonacci399 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result399 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci399', Fibonacci399);
defines.set('Result399', Result399);

class Fibonacci400 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result400 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci400', Fibonacci400);
defines.set('Result400', Result400);

class Fibonacci401 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result401 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci401', Fibonacci401);
defines.set('Result401', Result401);

class Fibonacci402 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result402 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci402', Fibonacci402);
defines.set('Result402', Result402);

class Fibonacci403 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result403 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci403', Fibonacci403);
defines.set('Result403', Result403);

class Fibonacci404 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result404 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci404', Fibonacci404);
defines.set('Result404', Result404);

class Fibonacci405 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result405 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci405', Fibonacci405);
defines.set('Result405', Result405);

class Fibonacci406 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result406 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci406', Fibonacci406);
defines.set('Result406', Result406);

class Fibonacci407 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result407 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci407', Fibonacci407);
defines.set('Result407', Result407);

class Fibonacci408 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result408 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci408', Fibonacci408);
defines.set('Result408', Result408);

class Fibonacci409 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result409 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci409', Fibonacci409);
defines.set('Result409', Result409);

class Fibonacci410 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result410 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci410', Fibonacci410);
defines.set('Result410', Result410);

class Fibonacci411 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result411 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci411', Fibonacci411);
defines.set('Result411', Result411);

class Fibonacci412 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result412 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci412', Fibonacci412);
defines.set('Result412', Result412);

class Fibonacci413 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result413 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci413', Fibonacci413);
defines.set('Result413', Result413);

class Fibonacci414 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result414 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci414', Fibonacci414);
defines.set('Result414', Result414);

class Fibonacci415 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result415 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci415', Fibonacci415);
defines.set('Result415', Result415);

class Fibonacci416 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result416 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci416', Fibonacci416);
defines.set('Result416', Result416);

class Fibonacci417 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result417 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci417', Fibonacci417);
defines.set('Result417', Result417);

class Fibonacci418 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result418 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci418', Fibonacci418);
defines.set('Result418', Result418);

class Fibonacci419 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result419 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci419', Fibonacci419);
defines.set('Result419', Result419);

class Fibonacci420 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result420 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci420', Fibonacci420);
defines.set('Result420', Result420);

class Fibonacci421 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result421 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci421', Fibonacci421);
defines.set('Result421', Result421);

class Fibonacci422 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result422 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci422', Fibonacci422);
defines.set('Result422', Result422);

class Fibonacci423 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result423 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci423', Fibonacci423);
defines.set('Result423', Result423);

class Fibonacci424 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result424 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci424', Fibonacci424);
defines.set('Result424', Result424);

class Fibonacci425 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result425 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci425', Fibonacci425);
defines.set('Result425', Result425);

class Fibonacci426 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result426 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci426', Fibonacci426);
defines.set('Result426', Result426);

class Fibonacci427 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result427 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci427', Fibonacci427);
defines.set('Result427', Result427);

class Fibonacci428 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result428 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci428', Fibonacci428);
defines.set('Result428', Result428);

class Fibonacci429 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result429 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci429', Fibonacci429);
defines.set('Result429', Result429);

class Fibonacci430 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result430 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci430', Fibonacci430);
defines.set('Result430', Result430);

class Fibonacci431 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result431 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci431', Fibonacci431);
defines.set('Result431', Result431);

class Fibonacci432 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result432 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci432', Fibonacci432);
defines.set('Result432', Result432);

class Fibonacci433 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result433 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci433', Fibonacci433);
defines.set('Result433', Result433);

class Fibonacci434 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result434 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci434', Fibonacci434);
defines.set('Result434', Result434);

class Fibonacci435 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result435 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci435', Fibonacci435);
defines.set('Result435', Result435);

class Fibonacci436 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result436 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci436', Fibonacci436);
defines.set('Result436', Result436);

class Fibonacci437 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result437 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci437', Fibonacci437);
defines.set('Result437', Result437);

class Fibonacci438 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result438 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci438', Fibonacci438);
defines.set('Result438', Result438);

class Fibonacci439 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result439 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci439', Fibonacci439);
defines.set('Result439', Result439);

class Fibonacci440 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result440 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci440', Fibonacci440);
defines.set('Result440', Result440);

class Fibonacci441 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result441 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci441', Fibonacci441);
defines.set('Result441', Result441);

class Fibonacci442 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result442 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci442', Fibonacci442);
defines.set('Result442', Result442);

class Fibonacci443 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result443 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci443', Fibonacci443);
defines.set('Result443', Result443);

class Fibonacci444 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result444 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci444', Fibonacci444);
defines.set('Result444', Result444);

class Fibonacci445 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result445 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci445', Fibonacci445);
defines.set('Result445', Result445);

class Fibonacci446 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result446 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci446', Fibonacci446);
defines.set('Result446', Result446);

class Fibonacci447 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result447 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci447', Fibonacci447);
defines.set('Result447', Result447);

class Fibonacci448 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result448 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci448', Fibonacci448);
defines.set('Result448', Result448);

class Fibonacci449 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result449 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci449', Fibonacci449);
defines.set('Result449', Result449);

class Fibonacci450 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result450 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci450', Fibonacci450);
defines.set('Result450', Result450);

class Fibonacci451 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result451 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci451', Fibonacci451);
defines.set('Result451', Result451);

class Fibonacci452 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result452 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci452', Fibonacci452);
defines.set('Result452', Result452);

class Fibonacci453 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result453 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci453', Fibonacci453);
defines.set('Result453', Result453);

class Fibonacci454 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result454 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci454', Fibonacci454);
defines.set('Result454', Result454);

class Fibonacci455 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result455 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci455', Fibonacci455);
defines.set('Result455', Result455);

class Fibonacci456 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result456 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci456', Fibonacci456);
defines.set('Result456', Result456);

class Fibonacci457 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result457 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci457', Fibonacci457);
defines.set('Result457', Result457);

class Fibonacci458 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result458 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci458', Fibonacci458);
defines.set('Result458', Result458);

class Fibonacci459 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result459 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci459', Fibonacci459);
defines.set('Result459', Result459);

class Fibonacci460 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result460 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci460', Fibonacci460);
defines.set('Result460', Result460);

class Fibonacci461 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result461 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci461', Fibonacci461);
defines.set('Result461', Result461);

class Fibonacci462 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result462 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci462', Fibonacci462);
defines.set('Result462', Result462);

class Fibonacci463 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result463 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci463', Fibonacci463);
defines.set('Result463', Result463);

class Fibonacci464 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result464 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci464', Fibonacci464);
defines.set('Result464', Result464);

class Fibonacci465 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result465 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci465', Fibonacci465);
defines.set('Result465', Result465);

class Fibonacci466 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result466 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci466', Fibonacci466);
defines.set('Result466', Result466);

class Fibonacci467 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result467 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci467', Fibonacci467);
defines.set('Result467', Result467);

class Fibonacci468 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result468 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci468', Fibonacci468);
defines.set('Result468', Result468);

class Fibonacci469 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result469 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci469', Fibonacci469);
defines.set('Result469', Result469);

class Fibonacci470 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result470 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci470', Fibonacci470);
defines.set('Result470', Result470);

class Fibonacci471 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result471 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci471', Fibonacci471);
defines.set('Result471', Result471);

class Fibonacci472 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result472 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci472', Fibonacci472);
defines.set('Result472', Result472);

class Fibonacci473 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result473 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci473', Fibonacci473);
defines.set('Result473', Result473);

class Fibonacci474 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result474 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci474', Fibonacci474);
defines.set('Result474', Result474);

class Fibonacci475 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result475 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci475', Fibonacci475);
defines.set('Result475', Result475);

class Fibonacci476 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result476 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci476', Fibonacci476);
defines.set('Result476', Result476);

class Fibonacci477 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result477 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci477', Fibonacci477);
defines.set('Result477', Result477);

class Fibonacci478 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result478 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci478', Fibonacci478);
defines.set('Result478', Result478);

class Fibonacci479 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result479 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci479', Fibonacci479);
defines.set('Result479', Result479);

class Fibonacci480 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result480 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci480', Fibonacci480);
defines.set('Result480', Result480);

class Fibonacci481 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result481 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci481', Fibonacci481);
defines.set('Result481', Result481);

class Fibonacci482 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result482 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci482', Fibonacci482);
defines.set('Result482', Result482);

class Fibonacci483 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result483 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci483', Fibonacci483);
defines.set('Result483', Result483);

class Fibonacci484 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result484 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci484', Fibonacci484);
defines.set('Result484', Result484);

class Fibonacci485 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result485 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci485', Fibonacci485);
defines.set('Result485', Result485);

class Fibonacci486 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result486 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci486', Fibonacci486);
defines.set('Result486', Result486);

class Fibonacci487 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result487 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci487', Fibonacci487);
defines.set('Result487', Result487);

class Fibonacci488 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result488 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci488', Fibonacci488);
defines.set('Result488', Result488);

class Fibonacci489 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result489 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci489', Fibonacci489);
defines.set('Result489', Result489);

class Fibonacci490 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result490 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci490', Fibonacci490);
defines.set('Result490', Result490);

class Fibonacci491 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result491 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci491', Fibonacci491);
defines.set('Result491', Result491);

class Fibonacci492 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result492 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci492', Fibonacci492);
defines.set('Result492', Result492);

class Fibonacci493 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result493 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci493', Fibonacci493);
defines.set('Result493', Result493);

class Fibonacci494 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result494 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci494', Fibonacci494);
defines.set('Result494', Result494);

class Fibonacci495 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result495 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci495', Fibonacci495);
defines.set('Result495', Result495);

class Fibonacci496 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result496 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci496', Fibonacci496);
defines.set('Result496', Result496);

class Fibonacci497 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result497 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci497', Fibonacci497);
defines.set('Result497', Result497);

class Fibonacci498 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result498 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci498', Fibonacci498);
defines.set('Result498', Result498);

class Fibonacci499 {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result499 {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci499', Fibonacci499);
defines.set('Result499', Result499);

const nools = require('../dist/compile');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const fs = require('fs');
fs.writeFileSync('./tests/017-too-many-rules.json', JSON.stringify(flow));
console.log('done');
process.exit();
