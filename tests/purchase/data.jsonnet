local purchase_schema = import '../../schemas/purchase.libsonnet';
local login_schema = import '../../schemas/login.libsonnet';

{
  tc01: login_schema.BaseLogin + purchase_schema.BasePurchase + {
    itemName: "HP LaserJet P1102 (CE651A)",
    itemPrice: "$290.00"
  }
}
