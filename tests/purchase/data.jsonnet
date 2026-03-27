local login_schema = import '../../schemas/user.libsonnet';

{
  tc01: login_schema.BaseUser + {
    itemName: "HP LaserJet P1102 (CE651A)"
  }
}
