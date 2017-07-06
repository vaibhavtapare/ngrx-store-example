//   public int FeedCodeID { get; set; }
//         public int FeedCode { get; set; }
//         public string FeedType { get; set; }
//         public string GeneralClass { get; set; }
//         public string Designator { get; set; }
//         public bool IsQuickFeedType { get; set; }

export interface FeedType { 
      FeedCodeID: number, 
      FeedCode:number , 
      FeedType: string, 
      GeneralClass: string, 
      Designator: string, 
      IsQuickFeedType: boolean
}